import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import HomeBottomSheet from "../components/HomeBottomSheet";
import useRequest from "../hooks/useRequest";
import { getRecommendations } from "../usecases/recommendations";
import Icon from "react-native-vector-icons/MaterialIcons";

import styled from "styled-components";

const Home = () => {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <HomeBottomSheet>
        <Recommendations />
      </HomeBottomSheet>
    </View>
  );
};

const formatAddress = (address) =>
  address.includes("United States")
    ? address.slice(0, address.length - 15)
    : address;
const getSafety = (cases) => {
  if (cases === 0) return "safe";
  if (cases < 5) return "caution";
  return "unsafe";
};
const Recommendations = () => {
  //   const [recommendations, Loading, error] = useRequest(getRecommendations);
  //   if (Loading) return <Loading />;
  //   if (error) return <Text>Error</Text>;

  return (
    <ScrollView style={{ padding: 16 }}>
      {recommendations.map(({ photos, name, address, duration, cases }, i) => (
        <RecommendationCard key={i}>
          <Image
            style={{ width: 48 }}
            source={photos ? getPhoto(photos) : ""}
          />
          <InfoContainer>
            <View>
              <Name>{name}</Name>
              <Address>{formatAddress(address)}</Address>
              <Address>{photos ? getPhoto(photos) : "none"}</Address>
            </View>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <IconWithText>
                <Icon name="drive-eta" size={14} color={"#000"} />
                <Duration>{Math.round(duration)} min</Duration>
              </IconWithText>
              <IconWithText style={{ marginLeft: 16 }}>
                <Icon name="add-circle" size={14} color={"#000"} />
                <Safety safety={getSafety(cases)}>{getSafety(cases)}</Safety>
              </IconWithText>
            </View>
          </InfoContainer>
        </RecommendationCard>
      ))}
    </ScrollView>
  );
};

export default Home;

const RecommendationCard = styled(TouchableOpacity)`
  background: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  height: 100px;
`;
const InfoContainer = styled(View)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Name = styled(Text)`
  font-family: Rubik-Bold;
  font-size: 18px;
  line-height: 20px;
`;
const Address = styled(Text)`
  margin-top: 6px;
  font-family: Rubik-Light;
  font-size: 11px;
  line-height: 12px;
  color: rgba(0, 0, 0, 0.6);
`;
const IconWithText = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Duration = styled(Text)`
  margin-left: 4px;
  font-family: Rubik-Light;
  font-size: 12px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.6);
`;
const Safety = styled(Text)`
  margin-left: 4px;
  font-family: Rubik;
  font-size: 12px;
  line-height: 14px;
  color: ${({ safety }) =>
    safety === "safe"
      ? "rgba(55, 143, 0, 0.6)"
      : safety === "caution"
      ? "#E9D100"
      : "#DD0000"};
`;

const data = [
  {
    name: "Whole Foods Market",
    rating: 4.4,
    photos: [
      {
        height: 1158,
        html_attributions: [
          "<a href='https://maps.google.com/maps/contrib/106164408161166924269'>michael walsh</a>",
        ],
        photo_reference:
          "CmRaAAAAJx2PX-_pJqOyvYYZc3QF0kJxmQdQcRQg-4dzybkTAGvr91n1ehZlbkn4PvS17WDnGb8J68AbmdVXFKEamQ7Yq5lbPmLVUEW-BFmHyL16ScCgFY3oCw2plFvHYyCrH7yREhA1_JhMLsqOt8vYwhEKn1hTGhR28ZPvP7njWzhqiJdZxdncZcHqHQ",
        width: 2048,
      },
    ],
    address: "788 S Grand Ave, Los Angeles, CA 90017, United States",
    location: {
      lat: 34.0456943,
      lng: -118.2572291,
    },
    totalRatings: 2411,
    priceLevel: 3,
    openingHours: {
      open_now: true,
      periods: [
        {
          close: {
            day: 0,
            time: "2100",
          },
          open: {
            day: 0,
            time: "0800",
          },
        },
        {
          close: {
            day: 1,
            time: "2100",
          },
          open: {
            day: 1,
            time: "0800",
          },
        },
        {
          close: {
            day: 2,
            time: "2100",
          },
          open: {
            day: 2,
            time: "0800",
          },
        },
        {
          close: {
            day: 3,
            time: "2100",
          },
          open: {
            day: 3,
            time: "0800",
          },
        },
        {
          close: {
            day: 4,
            time: "2100",
          },
          open: {
            day: 4,
            time: "0800",
          },
        },
        {
          close: {
            day: 5,
            time: "2100",
          },
          open: {
            day: 5,
            time: "0800",
          },
        },
        {
          close: {
            day: 6,
            time: "2100",
          },
          open: {
            day: 6,
            time: "0800",
          },
        },
      ],
      weekday_text: [
        "Monday: 8:00 AM – 9:00 PM",
        "Tuesday: 8:00 AM – 9:00 PM",
        "Wednesday: 8:00 AM – 9:00 PM",
        "Thursday: 8:00 AM – 9:00 PM",
        "Friday: 8:00 AM – 9:00 PM",
        "Saturday: 8:00 AM – 9:00 PM",
        "Sunday: 8:00 AM – 9:00 PM",
      ],
    },
  },
  {
    name: "Little Tokyo Market Place",
    rating: 4.4,
    photos: [
      {
        height: 4032,
        html_attributions: [
          "<a href='https://maps.google.com/maps/contrib/112824307976888809674'>kim</a>",
        ],
        photo_reference:
          "CmRaAAAAgAgqozR5oZ5AlKfToyn0AmigFp4rM1DU2R7CLWCRmh6C_HO6Y-Du9EkFWZft9FzvXiWXnjz6vv00zy7cx_a_NthAN_QNdJoGKY9OljVFZQfo6_CSmdDjIfSLNBpfI7bUEhDsMueuKlB8vrrL0j3dxkyCGhQjRzTFTf2K1yESYNp-bgQLuakM2g",
        width: 3024,
      },
    ],
    address: "333 S Alameda St #100, Los Angeles, CA 90013, United States",
    location: {
      lat: 34.0448212,
      lng: -118.2388758,
    },
    totalRatings: 1539,
    openingHours: {
      open_now: true,
      periods: [
        {
          close: {
            day: 0,
            time: "2100",
          },
          open: {
            day: 0,
            time: "0800",
          },
        },
        {
          close: {
            day: 1,
            time: "2100",
          },
          open: {
            day: 1,
            time: "0800",
          },
        },
        {
          close: {
            day: 2,
            time: "2100",
          },
          open: {
            day: 2,
            time: "0800",
          },
        },
        {
          close: {
            day: 3,
            time: "2100",
          },
          open: {
            day: 3,
            time: "0800",
          },
        },
        {
          close: {
            day: 4,
            time: "2100",
          },
          open: {
            day: 4,
            time: "0800",
          },
        },
        {
          close: {
            day: 5,
            time: "2100",
          },
          open: {
            day: 5,
            time: "0800",
          },
        },
        {
          close: {
            day: 6,
            time: "2100",
          },
          open: {
            day: 6,
            time: "0800",
          },
        },
      ],
      weekday_text: [
        "Monday: 8:00 AM – 9:00 PM",
        "Tuesday: 8:00 AM – 9:00 PM",
        "Wednesday: 8:00 AM – 9:00 PM",
        "Thursday: 8:00 AM – 9:00 PM",
        "Friday: 8:00 AM – 9:00 PM",
        "Saturday: 8:00 AM – 9:00 PM",
        "Sunday: 8:00 AM – 9:00 PM",
      ],
    },
  },
  {
    name: "Northgate Market",
    rating: 4.2,
    photos: [
      {
        height: 1920,
        html_attributions: [
          "<a href='https://maps.google.com/maps/contrib/104177496806688954662'>A Google User</a>",
        ],
        photo_reference:
          "CmRaAAAAueQfay8qREnD_9cMrhvwRcq1ZkSd9goRvn_DBYtWCEuI4Bksy_NdOdTaDYuCKN8hD3aZues5EtF77kua2FiJFQeCUAIoqel8J0qAbWA51sZUyEU6r7BSbDWflCCblta3EhASfffzZ4o4-FAlsM0DOdu_GhRJN3raGO3NQQVJIy7zSM7EBtj90g",
        width: 1080,
      },
    ],
    address: "2323 W Olympic Blvd, Los Angeles, CA 90006, United States",
    location: {
      lat: 34.0527778,
      lng: -118.2825,
    },
    totalRatings: 1147,
    openingHours: {
      open_now: true,
      periods: [
        {
          close: {
            day: 0,
            time: "2100",
          },
          open: {
            day: 0,
            time: "0800",
          },
        },
        {
          close: {
            day: 1,
            time: "2100",
          },
          open: {
            day: 1,
            time: "0800",
          },
        },
        {
          close: {
            day: 2,
            time: "2100",
          },
          open: {
            day: 2,
            time: "0800",
          },
        },
        {
          close: {
            day: 3,
            time: "2100",
          },
          open: {
            day: 3,
            time: "0800",
          },
        },
        {
          close: {
            day: 4,
            time: "2100",
          },
          open: {
            day: 4,
            time: "0800",
          },
        },
        {
          close: {
            day: 5,
            time: "2100",
          },
          open: {
            day: 5,
            time: "0800",
          },
        },
        {
          close: {
            day: 6,
            time: "2100",
          },
          open: {
            day: 6,
            time: "0800",
          },
        },
      ],
      weekday_text: [
        "Monday: 8:00 AM – 9:00 PM",
        "Tuesday: 8:00 AM – 9:00 PM",
        "Wednesday: 8:00 AM – 9:00 PM",
        "Thursday: 8:00 AM – 9:00 PM",
        "Friday: 8:00 AM – 9:00 PM",
        "Saturday: 8:00 AM – 9:00 PM",
        "Sunday: 8:00 AM – 9:00 PM",
      ],
    },
  },
  {
    name: "Henry's Market",
    rating: 4.1,
    address: "2101 Estrella Ave, Los Angeles, CA 90007, United States",
    location: {
      lat: 34.0331025,
      lng: -118.2761286,
    },
    totalRatings: 21,
    openingHours: {
      open_now: true,
      periods: [
        {
          close: {
            day: 0,
            time: "2100",
          },
          open: {
            day: 0,
            time: "0800",
          },
        },
        {
          close: {
            day: 1,
            time: "2100",
          },
          open: {
            day: 1,
            time: "0800",
          },
        },
        {
          close: {
            day: 2,
            time: "2100",
          },
          open: {
            day: 2,
            time: "0800",
          },
        },
        {
          close: {
            day: 3,
            time: "2100",
          },
          open: {
            day: 3,
            time: "0800",
          },
        },
        {
          close: {
            day: 4,
            time: "2100",
          },
          open: {
            day: 4,
            time: "0800",
          },
        },
        {
          close: {
            day: 5,
            time: "2100",
          },
          open: {
            day: 5,
            time: "0800",
          },
        },
        {
          close: {
            day: 6,
            time: "2100",
          },
          open: {
            day: 6,
            time: "0800",
          },
        },
      ],
      weekday_text: [
        "Monday: 8:00 AM – 9:00 PM",
        "Tuesday: 8:00 AM – 9:00 PM",
        "Wednesday: 8:00 AM – 9:00 PM",
        "Thursday: 8:00 AM – 9:00 PM",
        "Friday: 8:00 AM – 9:00 PM",
        "Saturday: 8:00 AM – 9:00 PM",
        "Sunday: 8:00 AM – 9:00 PM",
      ],
    },
  },
  {
    name: "Green Life Market",
    rating: 3.5,
    photos: [
      {
        height: 3456,
        html_attributions: [
          "<a href='https://maps.google.com/maps/contrib/113113438001263011567'>Mackenzie Ferguson</a>",
        ],
        photo_reference:
          "CmRaAAAA7blSKQkYODYMxXmfPJ2Kn886y_Yie4sL1UbRWa2lq6fRGaTWDt-xm8fNI16o2FtVLrvlAs7qJLvwKdEw2WFZ7bwO6DrgGGNlOXMcMTM_YVbBj58TuMYn-2kcJeiv845WEhAxcZAB2WenG--46UjEHYN2GhTQnJdqdLVDxBw3jh-iLYHcBjIkrQ",
        width: 4608,
      },
    ],
    address: "664 S Bixel St, Los Angeles, CA 90017, United States",
    location: {
      lat: 34.051806,
      lng: -118.2634422,
    },
    totalRatings: 12,
    openingHours: {
      open_now: true,
      periods: [
        {
          close: {
            day: 0,
            time: "2300",
          },
          open: {
            day: 0,
            time: "0800",
          },
        },
        {
          close: {
            day: 1,
            time: "2300",
          },
          open: {
            day: 1,
            time: "0800",
          },
        },
        {
          close: {
            day: 2,
            time: "2300",
          },
          open: {
            day: 2,
            time: "0800",
          },
        },
        {
          close: {
            day: 3,
            time: "2300",
          },
          open: {
            day: 3,
            time: "0800",
          },
        },
        {
          close: {
            day: 4,
            time: "2300",
          },
          open: {
            day: 4,
            time: "0800",
          },
        },
        {
          close: {
            day: 6,
            time: "0000",
          },
          open: {
            day: 5,
            time: "0800",
          },
        },
        {
          close: {
            day: 0,
            time: "0000",
          },
          open: {
            day: 6,
            time: "0800",
          },
        },
      ],
      weekday_text: [
        "Monday: 8:00 AM – 11:00 PM",
        "Tuesday: 8:00 AM – 11:00 PM",
        "Wednesday: 8:00 AM – 11:00 PM",
        "Thursday: 8:00 AM – 11:00 PM",
        "Friday: 8:00 AM – 12:00 AM",
        "Saturday: 8:00 AM – 12:00 AM",
        "Sunday: 8:00 AM – 11:00 PM",
      ],
    },
  },
];

const recommendations = data
  .map((r) => ({
    ...r,
    duration: 9.266666666666667,
    travelMethod: "driving",
    cases: Math.floor(Math.random() * 10),
  }))
  .sort((a, b) => a.cases - b.cases);
