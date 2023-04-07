import {NativeBaseProvider} from "native-base";
import {NavigationContainer} from "@react-navigation/native";
import CallForHelp from "../src/screens/RequestHelpModule/CallForHelp";
import {fireEvent, render, screen, waitFor} from "@testing-library/react-native";
import * as Location from 'expo-location';
import React from "react";

const component = (<NativeBaseProvider initialWindowMetrics={{
    frame: {
        width: 320, height: 640, x: 0, y: 0,
    }, insets: {
        left: 0, right: 0, bottom: 0, top: 0,
    },
}}>
    <NavigationContainer>
        <CallForHelp/>
    </NavigationContainer>
</NativeBaseProvider>)

const expectedValues = {
    explanationText: "You are currently requesting help. Below is a list of users who agreed to help you. They have constant access to your current location but, for privacy reasons, don't know your phone number. Be sure to contact them to discuss the details, or click the cross button to let them know you already expect help from someone else. DO NOT click cancel unless you are 100% sure you will get the help you need.",
    infoLabel: "Always prioritize your health!",
    refreshPeriod: 5 * 1000,
    noPermissionCoordinates: "NO_PERMISSION"
}

const content = {
    ribbonTitle: () => {
        return screen.queryByText("Requesting help")
    }, explanationText: () => {
        return screen.queryByText(expectedValues.explanationText)
    }, infoText: () => {
        return screen.queryByText(expectedValues.infoLabel)
    }, lastRefreshLabel: () => {
        return screen.queryByText(/Last refresh/)
    }, coordinatesLabel: () => {
        return screen.queryByText(/Latitude/)
    }, cancelButton: () => {
        return screen.queryByText("CANCEL")
    }, lastRefreshValue: () => {
        return screen.queryByText(/Last refresh/).props.children[1]
    }, latitudeValue: () => {
        return screen.queryByText(/Latitude/).props.children[1]
    }, longitudeValue: () => {
        return screen.queryByText(/Latitude/).props.children[4]
    }
}

jest.setTimeout(expectedValues.refreshPeriod * 2)
jest.mock('expo-location')

describe("Call for help", () => {
    it('renders correctly', () => {
        render(component)
        for (let i = 0; i < Object.entries(content).length; i++) {
            if (Object.entries(content)[i][1]() == null) {
                fail("Could not find element '" + Object.entries(content)[i][0] + "'!")
            }
        }
    })

    it('shows correct last refresh value on load', () => {
        render(component)
        let generatedDate = new Date('11-11-1999 ' + content.lastRefreshValue())
        let lowerErrorMargin = new Date(new Date('11-11-1999 ' + new Date().toString().substring(16, 24)).getTime() - 1000)
        let upperErrorMargin = new Date(new Date('11-11-1999 ' + new Date().toString().substring(16, 24)).getTime() + 1000)
        expect(generatedDate >= lowerErrorMargin && generatedDate <= upperErrorMargin).toBe(true)
    })

    it('updates last refresh value correctly', async () => {
        render(component)
        const firstValue = content.lastRefreshValue()
        await waitFor(() => {
            expect(content.lastRefreshValue()).not.toBe(firstValue)
        }, {timeout: expectedValues.refreshPeriod + 1, interval: expectedValues.refreshPeriod})
        let generatedDate = new Date('11-11-1999 ' + content.lastRefreshValue())
        let lowerErrorMargin = new Date(new Date('11-11-1999 ' + new Date().toString().substring(16, 24)).getTime() - 1000)
        let upperErrorMargin = new Date(new Date('11-11-1999 ' + new Date().toString().substring(16, 24)).getTime() + 1000)
        expect(generatedDate >= lowerErrorMargin && generatedDate <= upperErrorMargin).toBe(true)
    })

    it('asks for location permission', async () => {
        render(component)
        expect(Location.requestForegroundPermissionsAsync).toBeCalled()
    })

    it('goes to main screen if permission not granted', async () => {
        Location.requestForegroundPermissionsAsync.mockReturnValue({status: "notGranted"})
        render(component)
        expect(Location.requestForegroundPermissionsAsync).toBeCalled()

        // TODO: check if app goes to main screen
        await new Promise(r => setTimeout(r, expectedValues.refreshPeriod))
        expect(content.latitudeValue()).toBe(expectedValues.noPermissionCoordinates)
        expect(content.longitudeValue()).toBe(expectedValues.noPermissionCoordinates)
    })

    it('shows coordinates if permission is granted', async () => {
        Location.requestForegroundPermissionsAsync.mockReturnValue({status: "granted"})
        Location.getCurrentPositionAsync.mockReturnValue({
            coords: {
                latitude: 11.11111111111,
                longitude: 22.2222222222222
            }
        })
        render(component)
        await new Promise(r => setTimeout(r, expectedValues.refreshPeriod))
        expect(Location.requestForegroundPermissionsAsync).toBeCalled()
        expect(Location.getCurrentPositionAsync).toBeCalled()
        expect(content.latitudeValue()).toBe("11.11111111111".substring(0, 9))
        expect(content.longitudeValue()).toBe("22.2222222222222".substring(0, 9))
    })

    it('goes to main screen when clicking the cancel button', () => {
        Location.requestForegroundPermissionsAsync.mockReturnValue({status: "granted"})
        render(component)
        expect(() => {
            fireEvent.press(content.cancelButton())
        }).toThrowError("Not implemented") // TODO: check if goes to main screen
    })
})
