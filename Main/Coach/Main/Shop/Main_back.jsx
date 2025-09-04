import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./MainCss";
const background = require("./background.png");
import { Svg, G, Path, Mask, Rect } from "react-native-svg";

export default function MainShop({ navigation }) {
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <View style={styles.top_portion1}></View>
      <View style={styles.back_section}>
        <View style={styles.bs_1}>
          <TouchableOpacity style={styles.bs_1_circle}>
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Svg
                  width="22"
                  height="22"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Rect
                    width="20"
                    height="20"
                    transform="translate(0.841797)"
                    fill="white"
                    fillOpacity="0.01"
                    style="mix-blend-mode:multiply"
                  />
                  <Path
                    d="M16.4668 6.25H16.4293C16.2703 4.87964 15.6132 3.6155 14.583 2.69796C13.5528 1.78041 12.2214 1.27344 10.8418 1.27344C9.46224 1.27344 8.13078 1.78041 7.1006 2.69796C6.07041 3.6155 5.41333 4.87964 5.2543 6.25H5.2168C4.388 6.25 3.59314 6.57924 3.00709 7.16529C2.42104 7.75134 2.0918 8.5462 2.0918 9.375C2.0918 10.2038 2.42104 10.9987 3.00709 11.5847C3.59314 12.1708 4.388 12.5 5.2168 12.5H6.4668V6.875C6.4668 5.71468 6.92773 4.60188 7.74821 3.78141C8.56868 2.96094 9.68147 2.5 10.8418 2.5C12.0021 2.5 13.1149 2.96094 13.9354 3.78141C14.7559 4.60188 15.2168 5.71468 15.2168 6.875V13.125C15.2164 13.6976 15.0194 14.2528 14.6588 14.6976C14.2981 15.1424 13.7957 15.4499 13.2355 15.5688C13.0687 14.9836 12.6942 14.4794 12.1822 14.1506C11.6702 13.8218 11.0559 13.6911 10.4544 13.7828C9.85286 13.8746 9.30546 14.1826 8.91478 14.649C8.52409 15.1155 8.31694 15.7085 8.33214 16.3167C8.34735 16.925 8.58387 17.5069 8.99738 17.9532C9.41089 18.3996 9.97299 18.6798 10.5783 18.7414C11.1837 18.803 11.7907 18.6417 12.2856 18.2877C12.7806 17.9338 13.1294 17.4115 13.2668 16.8188C14.1537 16.6873 14.9641 16.2424 15.5511 15.5647C16.1382 14.8871 16.463 14.0216 16.4668 13.125V12.5C17.2956 12.5 18.0905 12.1708 18.6765 11.5847C19.2626 10.9987 19.5918 10.2038 19.5918 9.375C19.5918 8.5462 19.2626 7.75134 18.6765 7.16529C18.0905 6.57924 17.2956 6.25 16.4668 6.25ZM3.3418 9.375C3.3418 8.87772 3.53934 8.40081 3.89097 8.04918C4.2426 7.69755 4.71952 7.5 5.2168 7.5V11.25C4.71952 11.25 4.2426 11.0525 3.89097 10.7008C3.53934 10.3492 3.3418 9.87228 3.3418 9.375ZM10.8418 17.5C10.5946 17.5 10.3529 17.4267 10.1473 17.2893C9.94177 17.152 9.78156 16.9568 9.68695 16.7284C9.59234 16.4999 9.56758 16.2486 9.61582 16.0061C9.66405 15.7637 9.7831 15.5409 9.95791 15.3661C10.1327 15.1913 10.3555 15.0723 10.5979 15.024C10.8404 14.9758 11.0917 15.0005 11.3202 15.0952C11.5486 15.1898 11.7438 15.35 11.8811 15.5555C12.0185 15.7611 12.0918 16.0028 12.0918 16.25C12.0918 16.5815 11.9601 16.8995 11.7257 17.1339C11.4913 17.3683 11.1733 17.5 10.8418 17.5ZM16.4668 11.25V7.5C16.9641 7.5 17.441 7.69755 17.7926 8.04918C18.1443 8.40081 18.3418 8.87772 18.3418 9.375C18.3418 9.87228 18.1443 10.3492 17.7926 10.7008C17.441 11.0525 16.9641 11.25 16.4668 11.25Z"
                    fill="white"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue}>Shop</Text>
        </View>
        <View style={styles.bs_3}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              navigation.navigate("AwarenessCharacterSummary");
            }}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Svg
                  width="22"
                  height="22"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.84115 14.8731C12.5405 14.8731 14.7145 14.2703 14.9245 11.8505C14.9245 9.43241 13.4088 9.58791 13.4088 6.62101C13.4088 4.30353 11.2122 1.66675 7.84115 1.66675C4.47012 1.66675 2.27352 4.30353 2.27352 6.62101C2.27352 9.58791 0.757812 9.43241 0.757812 11.8505C0.968606 14.2794 3.14262 14.8731 7.84115 14.8731Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M9.83121 17.3811C8.69443 18.6434 6.92109 18.6583 5.77344 17.3811"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.search_section_whole}>
        <View style={styles.search_section}>
          <LinearGradient
            style={styles.search_section_input}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.search_svg_section}>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <G id="Iconly/Light-Outline/Search">
                  <G id="Search">
                    <G id="Group 3">
                      <Mask
                        id="mask0_43_3881"
                        style="mask-type:luminance"
                        maskUnits="userSpaceOnUse"
                        x="1"
                        y="1"
                        width="17"
                        height="17"
                      >
                        <Path
                          id="Clip 2"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.66699 1.66675H17.8977V17.8976H1.66699V1.66675Z"
                          fill="white"
                        />
                      </Mask>
                      <G mask="url(#mask0_43_3881)">
                        <Path
                          id="Fill 1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.78283 2.91675C5.99699 2.91675 2.91699 5.99591 2.91699 9.78175C2.91699 13.5676 5.99699 16.6476 9.78283 16.6476C13.5678 16.6476 16.6478 13.5676 16.6478 9.78175C16.6478 5.99591 13.5678 2.91675 9.78283 2.91675ZM9.78283 17.8976C5.30783 17.8976 1.66699 14.2567 1.66699 9.78175C1.66699 5.30675 5.30783 1.66675 9.78283 1.66675C14.2578 1.66675 17.8978 5.30675 17.8978 9.78175C17.8978 14.2567 14.2578 17.8976 9.78283 17.8976Z"
                          fill="white"
                        />
                      </G>
                    </G>
                    <G id="Group 6">
                      <Mask
                        id="mask1_43_3881"
                        style="mask-type:luminance"
                        maskUnits="userSpaceOnUse"
                        x="14"
                        y="14"
                        width="5"
                        height="5"
                      >
                        <Path
                          id="Clip 5"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.3672 14.7559H18.5539V18.9348H14.3672V14.7559Z"
                          fill="white"
                        />
                      </Mask>
                      <G mask="url(#mask1_43_3881)">
                        <Path
                          id="Fill 4"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.9291 18.9348C17.7699 18.9348 17.6099 18.874 17.4874 18.7523L14.5507 15.824C14.3066 15.5798 14.3057 15.184 14.5499 14.9398C14.7932 14.694 15.1891 14.6957 15.4341 14.9382L18.3707 17.8673C18.6149 18.1115 18.6157 18.5065 18.3716 18.7507C18.2499 18.874 18.0891 18.9348 17.9291 18.9348Z"
                          fill="white"
                        />
                      </G>
                    </G>
                  </G>
                </G>
              </Svg>
            </View>
            <View style={styles.serach_input_section}>
              <TextInput
                style={styles.sis_input}
                placeholder="Search"
                placeholderTextColor={"#ffffff50"}
              />
            </View>
          </LinearGradient>
        </View>
        <LinearGradient
          style={styles.filter_section}
          colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
        >
          <View style={styles.finter_section_in}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <Mask
                id="mask0_43_3765"
                style="mask-type:luminance"
                maskUnits="userSpaceOnUse"
                x="1"
                y="1"
                width="17"
                height="17"
              >
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.66797 1.66675H17.9176V17.9173H1.66797V1.66675Z"
                  fill="white"
                />
              </Mask>
              <G mask="url(#mask0_43_3765)">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.31214 9.66567C7.32714 9.679 7.3413 9.6915 7.35547 9.7065C8.25464 10.6282 8.75047 11.849 8.75047 13.1448V16.4648L10.6138 15.4498C10.7605 15.3698 10.8513 15.2132 10.8513 15.0407V13.1348C10.8513 11.844 11.3421 10.6273 12.233 9.71067L16.2638 5.42317C16.5246 5.14567 16.668 4.7815 16.668 4.39734V3.61734C16.668 3.23067 16.363 2.9165 15.9896 2.9165H3.59714C3.22297 2.9165 2.91797 3.23067 2.91797 3.61734V4.39734C2.91797 4.7815 3.0613 5.14567 3.32214 5.42234L7.31214 9.66567ZM8.4563 17.9173C8.28797 17.9173 8.1213 17.8723 7.96964 17.7823C7.6763 17.6073 7.50047 17.2982 7.50047 16.9548V13.1448C7.50047 12.199 7.14797 11.3082 6.50547 10.6257C6.4863 10.6098 6.46713 10.5923 6.45047 10.574L2.41214 6.27984C1.93214 5.76984 1.66797 5.10067 1.66797 4.39734V3.61734C1.66797 2.5415 2.5338 1.6665 3.59714 1.6665H15.9896C17.0521 1.6665 17.918 2.5415 17.918 3.61734V4.39734C17.918 5.09984 17.6538 5.76817 17.1755 6.279L13.1363 10.574C12.4671 11.264 12.1013 12.1715 12.1013 13.1348V15.0407C12.1013 15.6707 11.7605 16.2473 11.2121 16.5473L8.9113 17.8007C8.76797 17.8782 8.61214 17.9173 8.4563 17.9173Z"
                  fill="white"
                />
              </G>
            </Svg>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.outer_h_sv}>
        <ScrollView style={styles.options} horizontal={true}>
          <View style={styles.left_ep}></View>
          <TouchableOpacity style={styles.indi_options}>
            <Text style={styles.indi_option_text}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.indi_options}>
            <Text style={styles.indi_option_text}>Holistic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.indi_options}>
            <Text style={styles.indi_option_text}>Sports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.indi_options}>
            <Text style={styles.indi_option_text}>Superfoods</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.indi_options}>
            <Text style={styles.indi_option_text}>Supplements</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={styles.main_sv}>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
        <View style={styles.indi_product}>
          <View style={styles.indi_p_img_section}>
            <Image
              source={require("../../Images/img5.jpg")}
              style={styles.product_image}
            />
          </View>
          <Text style={styles.product_name}>Magnesium tablet for men</Text>
          <View style={styles.rate_p_section}>
            <Svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M7.02539 0.280518L5.38188 5.33873H0.0633602L4.36613 8.46488L2.72262 13.5231L7.02539 10.3969L11.3282 13.5231L9.68465 8.46488L13.9874 5.33873H8.6689L7.02539 0.280518Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.rate_text}>4.4/5</Text>
          </View>
          <View style={styles.price_buy_section}>
            <View style={styles.buy_now_btn}>
              <Text style={styles.buy_now_text}>Buy Now</Text>
            </View>
            <View style={styles.price_section_whole}>
              <Text style={styles.price_cut}>3.89 AED</Text>
              <Text style={styles.price}>3.89 AED</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
