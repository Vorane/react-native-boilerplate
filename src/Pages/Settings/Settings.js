import React from 'react';
import {
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
  Switch,
  Linking,
  Share
} from 'react-native';

import styled, { ThemeConsumer } from 'styled-components';
import IonIcon from 'react-native-vector-icons/Ionicons';

import is from 'is_js';
import Header from 'components/MenuHeader';
import Switcher from 'components/Switcher';
import ImageMessage from 'components/ImageMessage';
import folderImage from 'assets/images/folder.png';
import Config from "react-native-config"

const Page = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`;

const Content = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
  padding-horizontal: 10px;
`;

const Section = styled.View`
  padding-top: 20px;
`;

const SectionHeader = styled.Text`
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_SEMI_BOLD};
  color: ${(props) => props.theme.PRIMARY_COLOR};
  font-size: ${(props) => props.theme.FONT_SIZE_SMALL};
  margin-vertical: 10px;
`;

const SettingItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
`;
const SettingDetailContainer = styled.View`
  padding-right: 10px;
  flex: 1;
`;
const SettingItemTitle = styled.Text`
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_SEMI_BOLD};
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: ${(props) => props.theme.FONT_SIZE_LARGE};
`;
const SettingItemDescription = styled.Text`
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
`;
const SettingItemIcon = styled(IonIcon)``;

const OutlineButtonText = styled.Text`
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_SEMI_BOLD};
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
`;
const OutlineButton = styled.TouchableOpacity`
  padding-vertical: 5px
  padding-horizontal: 10px
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => props.theme.PRIMARY_TEXT_COLOR}

`;

export default function Settings({
  navigation,
  isDarkTheme,
  enableDarkTheme,
  disableDarkTheme,
  shopDetails
}) {

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Hello. Here is a link to my online store\nhttps://${shopDetails.domain}.${Config.DOMAIN}
          `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <ThemeConsumer>
      {(theme) => (
        <Page>
          <Header
            title="Settings"
            menuPress={() => {
              navigation.openDrawer();
            }}
          />
          <Content>
            <Section>
              <SectionHeader>Appearance</SectionHeader>
              <SettingItem>
                <SettingDetailContainer>
                  <SettingItemTitle>Dark mode</SettingItemTitle>
                  <SettingItemDescription>
                    Switch between light and dark for eye comfort
                  </SettingItemDescription>
                </SettingDetailContainer>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: theme.PRIMARY_COLOR_LIGHT,
                  }}
                  thumbColor={isDarkTheme ? theme.PRIMARY_COLOR : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {
                    isDarkTheme ? disableDarkTheme() : enableDarkTheme();
                  }}
                  value={isDarkTheme}
                />
              </SettingItem>
            </Section>
            <Section>
              <SectionHeader>Store</SectionHeader>
              <SettingItem>
                <SettingDetailContainer>
                  <SettingItemTitle>Online store</SettingItemTitle>
                  <SettingItemDescription>
                    View your store online
                  </SettingItemDescription>
                </SettingDetailContainer>
                <OutlineButton
                  onPress={() => { Linking.openURL(`https://${shopDetails.domain}.${Config.DOMAIN}`) }}>
                  <OutlineButtonText>View</OutlineButtonText>
                </OutlineButton>
              </SettingItem>
              <SettingItem>
                <SettingDetailContainer>
                  <SettingItemTitle>Store link</SettingItemTitle>
                  <SettingItemDescription>
                    Share link to your online shop with your customers
                  </SettingItemDescription>
                </SettingDetailContainer>
                <OutlineButton                  
                  onPress={onShare} title="Share"
                >
                  <OutlineButtonText>share</OutlineButtonText>
                </OutlineButton>
              </SettingItem>
            </Section>
          </Content>
        </Page>
      )}
    </ThemeConsumer>
  );
}
