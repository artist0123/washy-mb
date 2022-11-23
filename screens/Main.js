import React, { useEffect, useRef, useState } from "react";
import { useKeenSliderNative } from "keen-slider/react-native";
import { Dimensions, StyleSheet, Vibration } from "react-native";
import {
  Stack,
  Button,
  Image,
  Box,
  Text,
  Divider,
  Icon,
  Modal,
} from "native-base";
import Cards from "../components/Cards";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { auth, db } from "../database/firebaseDB";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getData, getSwitch, setSwitch } from "../App";

function MainPage({ navigation }) {
  const [nearCompleteModal, setNearCompleteModal] = useState(false);
  const [queueReadyModal, setQueueReadyModal] = useState(false);
  const [queueEmptyModal, setQueueEmptyModal] = useState(false);

  const [emptyMacName, setEmptyMacName] = useState("None");
  const [emptyLaundName, setEMptyLaundName] = useState("None");
  const [windowsWidth, setWindowsWidth] = useState(
    Dimensions.get("window").width
  );
  const height16_9 = (windowsWidth / 16) * 9;
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const images = [
    "https://images.pexels.com/photos/2254065/pexels-photo-2254065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    "https://images.pexels.com/photos/3794129/pexels-photo-3794129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  ];
  const slides = 4;
  const slider = useKeenSliderNative({
    slides,
    loop: true,
  });
  const [wmachine, setWmachine] = useState(null);

  const laundromat = useRef([]);
  useEffect(() => {
    onSnapshot(collection(db, "laundromat"), (snapshot) => {
      laundromat.current = snapshot.docs.map((doc) => {
        return { laundromat: doc.data(), docId: doc.id };
      });
    });
  }, []);

  // function wmCard() {
  //   const [wmachine, setWmachine] = useState(null);
  //   useEffect(() => {
  //     async function getWmachine() {
  //       let userid = await getData();
  //       laundromat.current.forEach((laund, index) => {
  //         laund.laundromat.wmachines.forEach((mchine, index2) => {
  //           mchine.queue.forEach((queue, index3) => {
  //             // console.log(userid);
  //             // console.log(queue.user_id);
  //             if (queue.user_id == userid) {
  //               // console.log(queue);
  //               // console.log(mchine);
  //               let wm = {
  //                 name: mchine.name,
  //                 queue_length: mchine.queue.length,
  //                 machineId: mchine.id,
  //                 laundId: laund.docId,
  //                 queueId: queue.id,
  //                 status: mchine.status,
  //               };
  //               console.log(wm);
  //               setWmachine(wm);
  //             }
  //           });
  //         });
  //       });
  //     }
  //     if (wmachine == null) {
  //       console.log("getting wm");
  //       // setTimeout(() => {
  //       //   getWmachine();
  //       // }, 5000);
  //       getWmachine();
  //       console.log(wmachine);
  //     }
  //   }, [laundromat]);
  //   return (
  //     <Box
  //       flex={8}
  //       onLayout={(event) => {
  //         setLayout(event.nativeEvent.layout);
  //       }}
  //     >
  //       <Cards item={wmachine} onPress={() => {}} layout={layout}></Cards>
  //     </Box>
  //   );
  // }

  function filterQueue(queues = []) {
    let whitelist = { washing: 0, "in queue": 0 };
    return queues.filter((val) => {
      return whitelist[val.status] != undefined;
    });
  }
  useEffect(() => {
    setInterval(async () => {
      let userid = await getData();
      let near = await getSwitch("near");
      let qready = await getSwitch("qready");
      laundromat.current.forEach((laund, index) => {
        laund.laundromat.wmachines.forEach(async (mchine, index2) => {
          let alertempty = await getSwitch(mchine.id);
          let countqueue = filterQueue(mchine.queue).length;
          if (countqueue == 0 && alertempty == "true") {
            console.log(alertempty, mchine.id);
            setEMptyLaundName(laund.laundromat.name);
            setEmptyMacName(mchine.name);
            setQueueEmptyModal(true);
            setSwitch(mchine.id, "false");
            Vibration.vibrate(2 * 1000);
          }
          mchine.queue.forEach((queue, index3) => {
            if (queue.user_id == userid) {
              let wm = {
                name: mchine.name,
                queue_length: mchine.queue.length,
                machineId: mchine.id,
                laundId: laund.docId,
                queueId: queue.id,
                status: mchine.status,
              };
              // console.log(wm);
              setWmachine(wm);
            }
            if (queue.status == "washing") {
              console.log(
                `${queue.id}: ${
                  (new Date().getTime() -
                    queue.finish_time.toDate().getTime()) /
                  1000 /
                  60
                }`
              );
              if (
                (new Date().getTime() - queue.finish_time.toDate().getTime()) /
                  1000 /
                  60 >=
                0
              ) {
                console.log(`${queue.id}: finish`);
                const storeRef = doc(db, "laundromat", laund.docId);
                const tempmachines = laund.laundromat.wmachines.filter(
                  (val) => {
                    if (val.id != mchine.id) {
                      return val;
                    }
                  }
                );
                const tempqueues = mchine.queue.filter((val) => {
                  if (val.id != queue.id) {
                    return val;
                  }
                });
                const temp2queues = [
                  ...tempqueues,
                  {
                    id: queue.id,
                    reserve_time: queue.reserve_time,
                    finish_time: queue.finish_time,
                    user_id: queue.user_id,
                    status: "paid",
                  },
                ];
                temp2queues.sort((a, b) => {
                  let sweight = {
                    washing: 0,
                    "in queue": 1,
                    cancel: 2,
                    paid: 3,
                  };
                  let minus = sweight[a.status] - sweight[b.status];
                  return isNaN(minus) ? 0 : minus;
                });

                console.log(filterQueue(temp2queues));
                const temp2machines = [
                  ...tempmachines,
                  {
                    id: mchine.id,
                    capacity: mchine.capacity,
                    duration: mchine.duration,
                    price: { cold: mchine.price.cold, hot: mchine.price.hot },
                    name: mchine.name,
                    status:
                      filterQueue(temp2queues).length > 0 ? "queue" : "ok",
                    queue: temp2queues,
                  },
                ];
                temp2machines.sort((a, b) => {
                  let sweight = { ok: 0, notok: 2, queue: 1 };
                  let minus = sweight[a.status] - sweight[b.status];
                  let minus2 = b.capacity - a.capacity;
                  return isNaN(minus) ? 0 : minus == 0 ? minus2 : minus;
                });
                updateDoc(storeRef, {
                  wmachines: temp2machines,
                });
              } else if (
                (new Date().getTime() - queue.finish_time.toDate().getTime()) /
                  1000 /
                  60 >=
                  -5 &&
                userid == queue.user_id
              ) {
                if (near == "true") {
                  setNearCompleteModal(true);
                  setSwitch("near", "false");
                  Vibration.vibrate(5 * 1000);
                }
              }
            } else if (queue.status == "in queue") {
              if (index3 == 0 && userid == queue.user_id) {
                if (qready == "true") {
                  setQueueReadyModal(true);
                  setSwitch("qready", "false");
                  Vibration.vibrate(2 * 1000);
                }
              }
            }
          });
        });
      });
    }, 1000);
  }, []);

  return (
    <Box bg="primary.400" size="full" flex={1} alignItems="stretch">
      <Stack direction="column" space="3" flex={1}>
        <Box
          flex={1}
          w={windowsWidth}
          h={height16_9}
          overflow="hidden"
          bg="primary.200"
          {...slider.containerProps}
        >
          {[...Array(slides).keys()].map((key) => {
            return (
              <Box key={key} {...slider.slidesProps[key]}>
                <Box w={windowsWidth} h={height16_9}>
                  <Image
                    overflow="hidden"
                    source={{
                      uri: images[key],
                    }}
                    w={windowsWidth}
                    h={height16_9}
                    alt="Main"
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
        <Divider
          alignSelf="center"
          bg="primary.300"
          w="300"
          thickness="3"
          mx="3%"
          orientation="horizontal"
        />
        <Stack
          direction="row"
          mx="3%"
          space="3"
          flex={0.5}
          alignItems="stretch"
          justifyItems="stretch"
        >
          <Button
            h={"100%"}
            flexGrow="1"
            colorScheme="primary"
            variant={"solid"}
            startIcon={
              <Icon size="md" as={Entypo} name="location-pin" color="white" />
            }
            onPress={() => {
              navigation.navigate("Map");
              console.log("hello");
            }}
          >
            ค้นหาร้านซักผ้า
          </Button>
          <Button
            h={"100%"}
            variant={"solid"}
            startIcon={
              <Icon size="md" as={Ionicons} name="person" color="white" />
            }
            colorScheme="info"
            onPress={() => {
              navigation.navigate("Login");
              console.log("hello");
            }}
          >
            ล็อกอินพนักงาน
          </Button>
        </Stack>
        <Divider
          alignSelf="center"
          bg="primary.300"
          w="300"
          thickness="3"
          mx="3%"
          orientation="horizontal"
        />
        <Stack direction="column" space="3" flex={1}>
          <Box
            bg="primary.200"
            mx="3%"
            h="full"
            display={"flex"}
            flexDirection="column"
            rounded="md"
            p="3%"
          >
            <Box h="6" mb="3%">
              <Text
                fontWeight="bold"
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                flex={1}
              >
                การซักของคุณ
              </Text>
            </Box>

            {/* {wmCard()} */}

            <Box
              flex={8}
              onLayout={(event) => {
                setLayout(event.nativeEvent.layout);
              }}
            >
              <Cards
                item={wmachine}
                onPress={() => {
                  navigation.navigate("Status", {
                    machineId: wmachine.machineId,
                    laundId: wmachine.laundId,
                    queueId: wmachine.queueId,
                  });
                }}
                layout={layout}
              ></Cards>
            </Box>
          </Box>
        </Stack>
      </Stack>

      {/* Modal ถึงคิว */}
      <Modal
        isOpen={queueReadyModal}
        onClose={() => setQueueReadyModal(false)}
        size="lg"
      >
        <Modal.Content maxWidth="350">
          <Modal.Body>
            <Text>ถึงคิวซักผ้าของคุณแล้ว</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {/* ใกล้ซักเสร็จ modal */}
      <Modal
        isOpen={nearCompleteModal}
        onClose={() => setNearCompleteModal(false)}
        size="lg"
      >
        <Modal.Content maxWidth="350">
          <Modal.Body>
            <Text>ผ้าของคุณจะซักเสร็จภายใน 5 นาที</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {/*queue empty modal */}
      <Modal
        isOpen={queueEmptyModal}
        onClose={() => setQueueEmptyModal(false)}
        size="lg"
      >
        <Modal.Content maxWidth="350">
          <Modal.Body>
            <Text>
              {emptyMacName} {emptyLaundName} คิวว่างแล้ว
            </Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}

const styles = StyleSheet.create({
  slider: {
    backgroundColor: "#fff",
    overflow: "hidden",
    width: "100%",
    height: "30%",
  },
  slide: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 30,
  },
});

export default MainPage;
