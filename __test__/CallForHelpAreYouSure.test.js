import CallForHelpAreYouSure from "../src/screens/RequestHelpModule/CallForHelpAreYouSure";
import {NativeBaseProvider} from "native-base";
import {fireEvent, render, screen} from '@testing-library/react-native'
import {NavigationContainer} from "@react-navigation/native";
import {toHaveStyle} from "@testing-library/jest-native/dist/to-have-style";

const component = (<NativeBaseProvider initialWindowMetrics={{
    frame: {
        width: 320, height: 640, x: 0, y: 0,
    }, insets: {
        left: 0, right: 0, bottom: 0, top: 0,
    },
}}>
    <NavigationContainer>
        <CallForHelpAreYouSure/>
    </NavigationContainer>
</NativeBaseProvider>)

const expectedValues = {
    correctEmail: "test",
    explanationText: "You are about to ask for the help of every user in 30km radius. This action can be performed about once every hour. Abusing this action WILL get you banned. Write your email to accept this operation."
}

const content = {
    goBackButton: () => {
        return screen.queryByText("GO BACK")
    }, okHelpMeButton: () => {
        return screen.queryByText("OK, HELP ME!")
    }, emailInput: () => {
        return screen.queryByPlaceholderText("Email")
    }, buttonOpacityWrapper: () => {
        return screen.queryByTestId("opacityView")
    }, warningTitle: () => {
        return screen.queryByText("Warning")
    }, explanationText: () => {
        return screen.queryByText(expectedValues.explanationText)
    }
}

// mocks
const mockedNavigate = jest.fn().mockImplementation(parameter => {
})

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav, useNavigation: () => ({
            navigate: mockedNavigate,
        }),
    };
});

describe('Call for help: are you sure screen', () => {
    it('renders correctly', () => {
        render(component)
        for (let i = 0; i < Object.entries(content).length; i++) {
            if (Object.entries(content)[i][1]() == null) {
                fail("Could not find element '" + Object.entries(content)[i][0] + "'!")
            }
        }
    })

    it('goes back to main screen when "GO BACK" button is clicked', () => {
        expect(() => {
            render(component)
            fireEvent.press(content.goBackButton())
        }).toThrowError("Not implemented") // TODO: expect to go to main screen
    })

    it('does not let the user continue with empty email', () => {
        render(component)
        fireEvent.press(content.okHelpMeButton())
        expect(content.goBackButton()).not.toBe(null)
    })

    it('does not let the user continue with incorrect email', () => {
        render(component)
        const inputField = content.emailInput()
        for (const testString in ["123123", "testMail", "mailTest", "test@mail.com", "$%^"]) {
            fireEvent.changeText(inputField, testString)
            fireEvent.press(content.okHelpMeButton())
        }
        expect(mockedNavigate).not.toHaveBeenCalled();
    })

    it('allows user to go to next screen if the email is correct', () => {
        render(component)
        fireEvent.changeText(content.emailInput(), expectedValues.correctEmail)
        fireEvent.press(content.okHelpMeButton())
        expect(mockedNavigate.mock.calls.length).toBe(1);
        expect(mockedNavigate).toHaveBeenCalledWith("CallForHelp");
    })

    it('changes "OK, HELP ME!" button opacity correctly', () => {
        render(component)
        expect.extend({toHaveStyle})
        const inputField = content.emailInput()
        expect(content.buttonOpacityWrapper()).toHaveStyle("opacity: 0.5")
        fireEvent.changeText(inputField, "incorrect@mail.com")
        expect(content.buttonOpacityWrapper()).toHaveStyle("opacity: 0.5")
        fireEvent.changeText(inputField, expectedValues.correctEmail)
        expect(content.buttonOpacityWrapper()).toHaveStyle("opacity: 1")
        fireEvent.changeText(inputField, "incorrectSecond@email.com")
        expect(content.buttonOpacityWrapper()).toHaveStyle("opacity: 0.5")
    })
})
