import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../theme/globalStyles';

interface Props {
    value: boolean;
    onValueChange: (value: boolean) => void;
    label?: string;
    style?: StyleProp<ViewStyle>;
  }

  export const Switche: React.FC<Props> = ({ value, onValueChange, label, style }) => {
    return (
      <View style={[styles.container, style] }>
        {label && <Text style={styles.label}>{label}</Text>}
        <Switch
          style={[styles.switch, {marginLeft:10}]}
          value={value}
          onValueChange={onValueChange}
          thumbColor={value ? colors.buttonPrimary : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
    );
  };

  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      marginRight: 10,
      fontSize: 16,
      color: '#333',
    },
    switch: {
      transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    }
  });
  

  