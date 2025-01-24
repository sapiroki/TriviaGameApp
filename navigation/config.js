import { HeaderRight } from '../components/HeaderRight';
import { HEADER_FONT_SIZE } from '../constants/layout';

export const HEADER_CONFIG = ({ settings }) => ({
  headerStyle: {
    backgroundColor: settings.isDarkMode ? "#2d2d2d" : "#f0f0f0",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  headerTintColor: settings.isDarkMode ? "#ffffff" : "#000000",
  headerTitleStyle: {
    fontSize: HEADER_FONT_SIZE,
  },
  headerRight: () => <HeaderRight />,
});