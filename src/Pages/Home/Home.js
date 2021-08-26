import React, {useState} from 'react'
import {View} from 'react-native'
import styled from 'styled-components'
import Header from 'components/MenuHeader'
import BalanceSectionImage from 'assets/images/Frame58.png'
import Ionicon from 'react-native-vector-icons/Ionicons'
import {SectionGrid} from 'react-native-super-grid'
import is from 'is_js'
import Switcher from 'components/Switcher'

const PageContainer = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`

const PageScrollView = styled.ScrollView`
	padding-top: 20px;
	padding-bottom: 30px;
`

const BalanceSectionContainer = styled.View`
	padding-horizontal: 20px;
`

const BalanceSection = styled.ImageBackground`
	height: 140px;
	background-color: ${(props) => props.theme.BORDER_COLOR};
	border-radius: 10px;
	padding-vertical: 5px;
	padding-horizontal: 10px;
	margin-bottom: 20px;
`

const BalanceDetails = styled.View`
	flex: 1;
	justify-content: space-between;
`

const LockedDetailsRow = styled.View`
	flex-direction: row;
	align-items: center;
`

const BalanceAmount = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_DIGITS_FONT};
	font-size: ${(props) => props.theme.FONT_SIZE_MASSIVE};
`

const BalanceText = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
	color: ${(props) => props.theme.colors.gray.PRIMARY_COLOR};
`

const PadlockIconContainer = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
`

const OpenIcon = styled(Ionicon)`
	padding-left: 20px;
`

const ClosedIcon = styled(Ionicon)`
	padding-left: 20px;
`

const InitialsContainer = styled.View`
	width: 40px;
	height: 40px;
	border-radius: 20px;
	background-color: ${(props) => props.theme.colors.red.PRIMARY_COLOR_FAINT};
	justify-content: center;
	align-items: center;
`

const InitialsText = styled.Text`
	color: ${(props) => props.theme.colors.red.PRIMARY_COLOR};
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	font-size: ${(props) => props.theme.FONT_SIZE_LARGE - 4};
`

const SectionHeader = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_SEMI_BOLD};
	font-size: ${(props) => props.theme.FONT_SIZE_LARGE};
	padding-top: 10px;
	padding-left: 10px;
`

const Section = styled(SectionGrid)`
	margin-horizontal: 10px;
`

const SectionCard = styled.TouchableOpacity`
	height: 100px;
	background-color: ${(props) =>
		props.theme.colors[props.backgroundColor].PRIMARY_COLOR};
	border-radius: 7px;
	justify-content: center;
	align-items: center;
`

const SectionIcon = styled(Ionicon)`
	padding-bottom: 10px;
	color: ${(props) => props.theme.PRIMARY_FOREGROUND_COLOR};
`

const SectionText = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	color: ${(props) => props.theme.PRIMARY_FOREGROUND_COLOR};
	text-align: center;
`

const FooterSpace = styled.View`
	height: 50px;
`

const sectionOneData = [
	{
		backgroundColor: 'red',
		iconName: 'wallet-outline',
		text: 'Withdraw',
		routeName: '',
	},
	{
		backgroundColor: 'red',
		iconName: 'calculator-outline',
		text: 'Accounts',
		routeName: 'Accounts',
	},
	{
		backgroundColor: 'blue',
		iconName: 'cash-outline',
		text: 'Loans',
		routeName: 'Loans',
	},
	{
		backgroundColor: 'blue',
		iconName: 'leaf-outline',
		text: 'Investments',
		routeName: 'Investments',
	},
]

const sectionTwoData = [
	{
		backgroundColor: 'purple',
		iconName: 'rose-outline',
		text: 'Products',
		routeName: 'ProductRoutes',
	},
	{
		backgroundColor: 'purple',
		iconName: 'folder-open-outline',
		text: 'Categories',
		routeName: 'CategoryRoutes',
	},
	{
		backgroundColor: 'purple',
		iconName: 'cart-outline',
		text: 'Purchases',
		routeName: '',
	},
]

const sectionThreeData = [
	{
		backgroundColor: 'teal',
		iconName: 'file-tray-stacked-outline',
		text: 'Orders',
		routeName: 'OrderRoutes',
	},
	{
		backgroundColor: 'teal',
		iconName: 'people-outline',
		text: 'My Customers',
		routeName: 'Customers',
	},
	{
		backgroundColor: 'teal',
		iconName: 'receipt-outline',
		text: 'Sales report',
		routeName: '',
	},
]

export default function Home({navigation}) {
	const [iconToShow, setIconToShow] = useState('closed')
	return (
		<PageContainer>
			<Header
				title="M-Pay"
				menuPress={() => {
					navigation.openDrawer()
				}}
			/>
			<PageScrollView>
				<BalanceSectionContainer>
					<BalanceSection
						source={BalanceSectionImage}
						imageStyle={{borderRadius: 10}}>
						<BalanceDetails>
							<View>
								<LockedDetailsRow>
									<View>
										<Switcher
											value={iconToShow}
											open={<BalanceAmount>56,000</BalanceAmount>}
											closed={<BalanceAmount>......</BalanceAmount>}
										/>
									</View>

									<View>
										<Switcher
											value={iconToShow}
											open={
												<PadlockIconContainer
													onPress={() => setIconToShow('closed')}>
													<OpenIcon name="lock-open-outline" size={20} />
												</PadlockIconContainer>
											}
											closed={
												<PadlockIconContainer
													onPress={() => {
														setIconToShow('open')
														setTimeout(() => {
															setIconToShow('closed')
														}, 30000)
													}}>
													<ClosedIcon name="lock-closed-outline" size={20} />
												</PadlockIconContainer>
											}
										/>
									</View>
								</LockedDetailsRow>
								<BalanceText>Total balance</BalanceText>
							</View>

							<InitialsContainer>
								<InitialsText>EM</InitialsText>
							</InitialsContainer>
						</BalanceDetails>
					</BalanceSection>
				</BalanceSectionContainer>

				<Section
					itemDimension={100}
					sections={[{title: 'Loans', data: sectionOneData}]}
					renderItem={({item, section, index}) => (
						<SectionCard
							backgroundColor={item.backgroundColor}
							key={index}
							onPress={() =>
								is.not.empty(item.routeName) &&
								navigation.navigate(`${item.routeName}`)
							}>
							<SectionIcon name={item.iconName} size={35} />
							<SectionText>{item.text}</SectionText>
						</SectionCard>
					)}
					renderSectionHeader={({section}) => (
						<SectionHeader>{section.title}</SectionHeader>
					)}
				/>

				<Section
					itemDimension={100}
					sections={[{title: 'E-Shop', data: sectionTwoData}]}
					renderItem={({item, section, index}) => (
						<SectionCard
							backgroundColor={item.backgroundColor}
							key={index}
							onPress={() =>
								is.not.empty(item.routeName) &&
								navigation.navigate(`${item.routeName}`)
							}>
							<SectionIcon name={item.iconName} size={35} />
							<SectionText>{item.text}</SectionText>
						</SectionCard>
					)}
					renderSectionHeader={({section}) => (
						<SectionHeader>{section.title}</SectionHeader>
					)}
				/>

				<Section
					itemDimension={100}
					sections={[{title: 'Orders', data: sectionThreeData}]}
					renderItem={({item, section, index}) => (
						<SectionCard
							backgroundColor={item.backgroundColor}
							key={index}
							onPress={() =>
								is.not.empty(item.routeName) &&
								navigation.navigate(`${item.routeName}`)
							}>
							<SectionIcon name={item.iconName} size={35} />
							<SectionText>{item.text}</SectionText>
						</SectionCard>
					)}
					renderSectionHeader={({section}) => (
						<SectionHeader>{section.title}</SectionHeader>
					)}
				/>
				<FooterSpace />
			</PageScrollView>
		</PageContainer>
	)
}
