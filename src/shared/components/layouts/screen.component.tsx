import React, {ReactElement} from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, StyleProp, View, ViewStyle} from 'react-native';
import {tw} from 'react-native-tailwindcss';
import {useTheme} from '../../../core/theme/theme.hook';
import {ScrollView} from 'react-native-gesture-handler';

export default function ScreenComponent({
                                          children,
                                          scrollView = true,
                                          contentStyle,
                                          style,
                                          header = false
                                        }: AppScreenComponent): ReactElement {
  const {colors} = useTheme();
  return scrollView ? (
    <KeyboardAvoidingView
      behavior={(Platform.OS === 'ios') ? 'padding' : null}
      style={[
        tw.pX4,
        tw.justifyStart,
        tw.flex1,
        {backgroundColor: colors.grayscale.bg},
        style
      ]}
    >
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >

          <View style={[tw.justifyCenter, contentStyle]}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  ) : (
    <KeyboardAvoidingView style={[tw.pX4, tw.justifyStart, tw.flex1, {backgroundColor: colors.grayscale.bg}, style]}>
      <SafeAreaView>
        <View>
          <View style={[tw.justifyCenter, contentStyle]}>
            {children}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

interface AppScreenComponent {
  children?: ReactElement | ReactElement[] | never[];

  scrollView?: boolean;

  style?: StyleProp<ViewStyle>;

  contentStyle?: StyleProp<ViewStyle>;

  header?: boolean;
}
