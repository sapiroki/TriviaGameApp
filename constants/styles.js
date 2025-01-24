import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    gap: 10,
  },
  topicButton: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  topicText: {
    textAlign: 'center',
  },
  questionText: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  answerButton: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  answerText: {
    textAlign: 'center',
  },
  progressText: {
    textAlign: 'center',
    marginTop: 20,
  },
  settingsContainer: {
    padding: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  settingTitle: {
    fontWeight: 'bold',
  },
  fontSizeSection: {
    marginTop: 20,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  fontSizeLabel: {
    marginHorizontal: 10,
  },
  pickerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
  },
  picker: {
    height: 50,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreMessage: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    marginBottom: 10,
  },
  percentageText: {
    marginBottom: 20,
  },
});
