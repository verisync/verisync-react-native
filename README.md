# verisync-react-native

The `Verisync` Identity Verification Button is a React Native component designed to simplify the process of integrating identity verification within your React Native application. It wraps the complexity of initiating and handling identity verification flows into a simple, easy-to-use component.

## Installation

```sh
npm install verisync-react-native
```

## Usage

```js
import Verisync from 'verisync-react-native';

// ...

<SafeAreaView>
  <Verisync
    clientId="your client id"
    flowId="your flow id"
    redirectUrl="your redirect url"
    email="logged in user email"
  />
</SafeAreaView>;
```

## Features

- **Simple Integration**: Just drop the `Verisync` into your screen to get started.
- **Customizable**: Supports full customization all UI elements displayed on your app including passing custom component as child/props to the Verisync Component.
- **Callback Support**: Provides `onCompleted` and `onClose` callbacks to handle user actions side effects.
- **Dialog Presentation**: Shows the identity verification process in a dialog for a seamless user experience.

## Props Documentation

### clientId (required)

- **Type:** `string`
- **Description:** A unique identifier for the client using the Verisync service. It is essential for the Verisync backend to recognize the incoming request and process it accordingly.

### flowId (required)

- **Type:** `string`
- **Description:** Identifies the specific verification flow to be initiated. Different `flowId` values can represent different types of verification processes tailored to various requirements.

### redirectUrl (required)

- **Type:** `string`
- **Description:** The URL to which the user will be redirected once the verification process is completed. This URL is needed to help auto close the verification dialog after completion.

### email (optional)

- **Type:** `string`
- **Description:** Prefills the email field in the verification process, if applicable. This can streamline the process for users by reducing the amount of information they need to enter manually.

### onCompleted (optional)

- **Type:** `() => void`
- **Description:** A callback function that is executed when the verification process is successfully completed. This can be used to trigger subsequent actions in the app, like navigating to a different screen or updating the user's status.

### onClose (optional)

- **Type:** `() => void`
- **Description:** A callback function that is called when the verification modal is closed, regardless of whether the verification was completed. This is useful for performing cleanup or state updates.

### closeComponent (optional)

- **Type:** `React.ReactElement`
- **Description:** Allows customization of the close button component within the verification modal. If not provided, a default close button with the text "Close" will be used.
- **Example:**

```js
<Verisync
  {...otherProps}
  closeComponent={
    <Pressable style={styles.close}>
      <Text>Close</Text>
    </Pressable>
  }
/>
```

### buttonText (optional)

- **Type:** `string`
- **Description:** Custom text for the button that triggers the verification modal. If not specified, the default text "Perform KYC" is used.

### buttonStyle (optional)

- **Type:** `ViewStyle`
- **Description:** Custom styling for the button that opens the verification modal. This prop allows the button to be styled to match the app's design theme.

### buttonTextStyle (optional)

- **Type:** `TextStyle`
- **Description:** Custom styling for the text inside the button that triggers the verification modal. This allows for further customization of the button's appearance.

### metadata (optional)

- **Type:** `Record<string, any>`
- **Description:** Additional metadata that can be sent along with the verification request. This can include any extra information that needs to be considered during the verification process.

### children (optional)

- **Type:** `React.ReactElement`
- **Description:** Instead of using the default button provided by the component, you can pass a custom React element (such as a button or link) that will trigger the verification modal. The custom element will have the `startVerification` function attached to its `onPress` event.

- **Example:**

```js
<Verisync {...otherProps}>
  <Pressable style={styles.button}>
    <Text>Start Verification</Text>
  </Pressable>
</Verisync>
```

### Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

### License

MIT

---
