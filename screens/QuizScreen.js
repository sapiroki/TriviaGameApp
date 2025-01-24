import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { decodeHTMLEntities } from '../utils/helpers';
import { COLORS } from '../constants/colors';
import { SettingsContext } from '../context/SettingsContext';
import { styles } from '../constants/styles';

const getErrorMessage = (responseCode) => {
  switch (responseCode) {
    case 1:
      return "Not enough questions available for this topic/difficulty combination.";
    case 2:
      return "Invalid parameters provided to the API.";
    case 3:
      return "Session token not found.";
    case 4:
      return "All questions for this category have been exhausted.";
    case 5:
      return "Too many requests. Please wait a few seconds.";
    default:
      return "An unexpected error occurred.";
  }
};

export const QuizScreen = ({ route, navigation }) => {
  const { topicId, difficulty } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const { settings } = React.useContext(SettingsContext);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = `https://opentdb.com/api.php?amount=10&category=${topicId}&difficulty=${difficulty}&type=multiple`;
      
      console.log('API Request:', {
        timestamp: new Date().toISOString(),
        url: apiUrl,
        category: topicId,
        difficulty: difficulty
      });

      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log('API Response:', {
        responseCode: data.response_code,
        questionCount: data.results?.length,
        status: data.response_code === 0 ? 'Success' : 'Error'
      });

      if (data.response_code === 0 && data.results?.length > 0) {
        setQuestions(data.results);
        const initialAnswers = [
          ...data.results[0].incorrect_answers,
          data.results[0].correct_answer,
        ].sort(() => Math.random() - 0.5);
        setShuffledAnswers(initialAnswers);
      } else {
        setError(getErrorMessage(data.response_code));
      }
    } catch (error) {
      console.error('API Error:', error);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswer = async (answer) => {
    if (isAnswerLocked) return;

    setSelectedAnswer(answer);
    setIsAnswerLocked(true);

    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    if (isCorrect) setScore(score + 1);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (currentQuestionIndex < questions.length - 1) {
      const nextAnswers = [
        ...questions[currentQuestionIndex + 1].incorrect_answers,
        questions[currentQuestionIndex + 1].correct_answer,
      ].sort(() => Math.random() - 0.5);
      setShuffledAnswers(nextAnswers);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerLocked(false);
    } else {
      navigation.replace("Results", { score, total: questions.length });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: settings.isDarkMode ? "#1a1a1a" : "#ffffff" }]}>
        <ActivityIndicator size="large" color={settings.isDarkMode ? "#ffffff" : "#000000"} />
      </View>
    );
  }

  if (error || questions.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: settings.isDarkMode ? "#1a1a1a" : "#ffffff" }]}>
        <Text style={[styles.text, { color: settings.isDarkMode ? "#ffffff" : "#000000" }]}>
          {error || "No questions available"}
        </Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: settings.isDarkMode ? "#1a1a1a" : "#ffffff" }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.questionText, { 
          color: settings.isDarkMode ? "#ffffff" : "#000000",
          fontSize: settings.fontSize + 4 
        }]}>
          {decodeHTMLEntities(currentQuestion.question)}
        </Text>

        {shuffledAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          const isCorrect = answer === currentQuestion.correct_answer;
          let buttonColor = settings.isDarkMode ? "#333333" : "#e0e0e0";

          if (selectedAnswer) {
            if (isCorrect) buttonColor = COLORS.correct;
            else if (isSelected) buttonColor = COLORS.incorrect;
          }

          return (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.answerButton,
                { backgroundColor: buttonColor, opacity: pressed ? 0.7 : 1 }
              ]}
              onPress={() => handleAnswer(answer)}
              disabled={isAnswerLocked}
            >
              <Text style={[styles.answerText, { 
                color: settings.isDarkMode ? "#ffffff" : "#000000",
                fontSize: settings.fontSize 
              }]}>
                {decodeHTMLEntities(answer)}
              </Text>
            </Pressable>
          );
        })}

        <Text style={[styles.progressText, { 
          color: settings.isDarkMode ? "#ffffff" : "#000000",
          fontSize: settings.fontSize 
        }]}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};