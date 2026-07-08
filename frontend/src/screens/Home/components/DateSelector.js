import React, { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { MaterialIcons } from "@expo/vector-icons";

import {
  formatDisplayDate,
  fromDateKey,
  toDateKey,
} from "../../../utils/date";
import styles from "./style";

export default function DateSelector({
  date,
  setDate,
}) {
  const [calendarVisible, setCalendarVisible] = useState(false);

  const selectedDateKey = toDateKey(date);
  const todayDateKey = toDateKey(new Date());

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.title}>
          Business Date
        </Text>

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setCalendarVisible(true)}
        >
          <Text style={styles.inputText}>
            {formatDisplayDate(date)}
          </Text>

          <MaterialIcons
            name="calendar-month"
            size={24}
            color="#EC5AA7"
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={calendarVisible}
        transparent
        animationType="fade"
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setCalendarVisible(false)}
        >
          <Pressable style={styles.calendarCard}>
            <Text style={styles.calendarTitle}>
              Select Business Date
            </Text>

            <Calendar
              current={selectedDateKey}
              maxDate={todayDateKey}
              disableAllTouchEventsForDisabledDays
              markedDates={{
                [selectedDateKey]: {
                  selected: true,
                  selectedColor: "#EC5AA7",
                },
              }}
              onDayPress={(day) => {
                setDate(fromDateKey(day.dateString));
                setCalendarVisible(false);
              }}
              theme={{
                todayTextColor: "#EC5AA7",
                arrowColor: "#EC5AA7",
                textDayFontWeight: "600",
                textMonthFontWeight: "700",
                textDayHeaderFontWeight: "700",
              }}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCalendarVisible(false)}
            >
              <Text style={styles.closeButtonText}>
                Close
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
