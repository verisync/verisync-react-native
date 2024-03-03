import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  SafeAreaView,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { WebView, type WebViewNavigation } from 'react-native-webview';

interface VerisyncProps {
  clientId: string;
  flowId: string;
  redirectUrl: string;
  onCompleted?: () => void;
  onClose?: () => void;
  closeComponent?: React.ReactElement;
  email?: string;
  buttonText?: string;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  metadata?: Record<string, any>;
  children?: React.ReactElement;
}

const BASE_URL = 'https://app.verisync.co/synchronizer';
const AUTO_CLOSE_PARAM = 'verisync-redirect';

export default function Verisync(props: VerisyncProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [verificationUrl, setVerificationUrl] = useState<string | null>(null);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const {
    clientId,
    flowId,
    redirectUrl,
    email,
    buttonText,
    buttonStyle,
    buttonTextStyle,
    metadata,
    children,
    closeComponent,
    onCompleted,
    onClose,
  } = props;

  const constructUrlSearchParams = (params: Record<string, any>) => {
    const urlParams = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        urlParams.append(key, params[key]);
      }
    }
    return urlParams.toString();
  };

  const handleNavigationStateChange = (state: WebViewNavigation) => {
    const params = new URLSearchParams(state.url.split('?')[1]);
    if (params.has(AUTO_CLOSE_PARAM)) {
      if (onCompleted) {
        onCompleted();
      }
      setModalVisible(false);
    }
  };

  const closeDialog = () => {
    if (onClose) {
      onClose();
    }
    setModalVisible(false);
  };

  const startVerification = () => {
    if (!clientId || !flowId || !redirectUrl) {
      throw new Error('clientId, flowId, and redirectUrl are required props!');
    }
    const params = {
      client_id: clientId,
      flow_id: flowId,
      redirect_url: redirectUrl + `?${AUTO_CLOSE_PARAM}`,
      email: email || '',
      metadata: JSON.stringify(metadata || {}),
    };

    const urlSearchParams = constructUrlSearchParams(params);

    setVerificationUrl(`${BASE_URL}?${urlSearchParams}`);
    setModalVisible(true);
  };

  const childrenWithProps = children
    ? React.cloneElement(children, { onPress: startVerification })
    : null;

  const defaultCloseComponent = (
    <Pressable style={styles.close}>
      <Text>Close</Text>
    </Pressable>
  );

  const closeWithProps = React.cloneElement(
    closeComponent || defaultCloseComponent,
    {
      onPress: closeDialog,
    }
  );

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.closeWrapper}>{closeWithProps}</View>
          {verificationUrl ? (
            <WebView
              pullToRefreshEnabled
              allowFileAccess
              source={{ uri: verificationUrl }}
              style={{ width: windowWidth, height: windowHeight }}
              onNavigationStateChange={handleNavigationStateChange}
            />
          ) : null}
        </SafeAreaView>
      </Modal>
      {childrenWithProps || (
        <Pressable
          style={[styles.button, buttonStyle]}
          onPress={startVerification}
        >
          <Text style={[styles.textStyle, buttonTextStyle]}>
            {buttonText || 'Perform KYC'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  close: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  closeWrapper: {
    alignItems: 'flex-start',
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    backgroundColor: '#5A50FE',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
