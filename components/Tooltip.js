import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Tooltip Component
 *
 * A component that displays a tooltip on hover.
 *
 * @param {string} text - The text content of the tooltip.
 * @param {ReactNode} children - The content that triggers the tooltip on hover.
 * @param {boolean} bottom - Determines whether to display the tooltip below the content.
 */
const Tooltip = ({ text, children, customStyle }) => {
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
      top: '-50%',
      left: '250%',
      transform: 'translateX(-30px)',
      backgroundColor: 'black',
      color: '#fff',
      padding: 10,
      borderRadius: 4,
      zIndex: 2,
    },
  });

  const handleMouseEnter = () => {
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
      {isHovered && <Text style={[styles.tooltipText, customStyle]} >{text}</Text>} 
    </View>
  );
};



export default Tooltip;
