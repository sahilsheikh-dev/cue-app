import React from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useIAP } from "./useIap"; // Import the hook

const SubscriptionInApp = () => {
  const {
    isLoading,
    products,
    handleRequestSubscription,
    handleRestorePurchases,
  } = useIAP();

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium Plans</Text>
      {products.map((product) => (
        <View key={product.productId} style={styles.product}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text>{product.description}</Text>
          <Button
            title={`Subscribe for ${product.localizedPrice}`}
            onPress={() => handleRequestSubscription(product.productId)}
          />
        </View>
      ))}

      <View style={styles.restoreButton}>
        <Button title="Restore Purchases" onPress={handleRestorePurchases} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Add some basic styles
  container: { flex: 1, padding: 20, justifyContent: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  product: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  productTitle: { fontSize: 18, fontWeight: "bold" },
  restoreButton: { marginTop: 30 },
});

export default SubscriptionInApp;
