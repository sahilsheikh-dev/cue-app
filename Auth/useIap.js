import { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
  initConnection,
  endConnection,
  getSubscriptions,
  requestSubscription,
  purchaseErrorListener,
  purchaseUpdatedListener,
  getAvailablePurchases,
  finishTransaction,
} from "react-native-iap";

// Use the same Product ID you created in App Store Connect
const subscriptionSkus = Platform.select({
  ios: [
    "net.cuewellness.appsubscription",
    "net.cuewellness.reflection.appsubscription",
  ],
  // Add your Android SKUs here if needed
  android: [],
});

let purchaseUpdateSubscription = null;
let purchaseErrorSubscription = null;

export const useIAP = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Initialize the connection
    initConnection()
      .then(async () => {
        // 2. Fetch available products
        try {
          const fetchedProducts = await getSubscriptions({
            skus: subscriptionSkus,
          });
          setProducts(fetchedProducts);
          console.log("Fetched Products: ", fetchedProducts);
        } catch (error) {
          console.error("Error fetching subscriptions: ", error);
        } finally {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error connecting to store: ", error);
        setIsLoading(false);
      });

    // 3. Set up purchase listeners
    purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
      console.log("purchaseUpdatedListener", purchase);
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        try {
          // **IMPORTANT!!** Send the receipt to your server for validation and processing.
          // await validateReceipt(receipt);

          // Tell the store that you have delivered the content to the user.
          // If you fail to do this, you will be charged again and again.
          await finishTransaction({ purchase, isConsumable: false });
          console.log("Transaction Finished");
        } catch (error) {
          console.error("Error handling purchase:", error);
        }
      }
    });

    purchaseErrorSubscription = purchaseErrorListener((error) => {
      console.log("purchaseErrorListener", error);
    });

    // 4. Clean up listeners on unmount
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
      endConnection();
    };
  }, []);

  // 5. Function to trigger a purchase
  const handleRequestSubscription = async (sku) => {
    try {
      await requestSubscription({ sku });
    } catch (error) {
      console.error("Subscription Request Error: ", error);
    }
  };

  // 6. Function to restore purchases
  const handleRestorePurchases = async () => {
    try {
      const availablePurchases = await getAvailablePurchases();
      // For each purchase, validate the receipt with your server and unlock content
      console.log("Restored Purchases: ", availablePurchases);
      // Typically, you'd loop through these and validate each one.
    } catch (error) {
      console.error("Restore Purchases Error: ", error);
    }
  };

  return {
    isLoading,
    products,
    handleRequestSubscription,
    handleRestorePurchases,
  };
};
