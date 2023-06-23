import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tooltip = ({ text, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <View style={styles.tooltipContainer}>
      <View
        style={styles.tooltip}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </View>
      {isHovered && <Text style={styles.tooltipText}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'relative',
  },
  tooltip: {
    position: 'relative',
    zIndex: 1,
  },
  tooltipText: {
    position: 'absolute',
    top: '120%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: 10,
    borderRadius: 4,
    zIndex: 2,
  },
});

export default Tooltip;
