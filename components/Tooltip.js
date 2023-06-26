import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tooltip = ({ text, children, bottom }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ isBottom, setIsBottom ] = useState(false)
  let timeoutId; // Variable to store the timeout ID

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
      top: isBottom ? '120%' : '-50%',
      left: isBottom ? '50%' :'250%',
      transform: 'translateX(-50%)',
      backgroundColor: 'black',
      color: '#fff',
      padding: 10,
      borderRadius: 4,
      zIndex: 2,
    },
  });

  const handleMouseEnter = () => {
    if (bottom == true) {
      setIsBottom(true)
    }
    timeoutId = setTimeout(() => {
      setIsHovered(true);
    }, 200); // Delay of 2 seconds (2000 milliseconds)
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
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



export default Tooltip;
