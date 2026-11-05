import React, { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { mockClinics, mockServices } from "../../assets/mockData";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { colors } from "../../components/theme";
import { useBookings } from "../../context/BookingContext";
import { usePets } from "../../context/PetContext";
import { bookingApi } from "../../services/api";
import { Booking, PaymentMethod } from "../../types";
import { formatCurrency, formatDate, todayISO } from "../../utils/formatters";

const times = ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"];
const staffOptions = ["BS. Trần Thu Hà", "KTV. Lan Anh", "BS. Nguyễn Minh"];
const paymentOptions: PaymentMethod[] = ["MoMo", "VNPay", "Tiền mặt"];

function dateOptions() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 10);
  });
}

export function BookingScreen({ navigation }: any) {
  const { pets } = usePets();
  const { addBooking } = useBookings();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(mockServices[0].id);
  const [petId, setPetId] = useState(pets[0]?.id ?? "");
  const [clinicId, setClinicId] = useState(mockClinics[0].id);
  const [staffName, setStaffName] = useState(staffOptions[0]);
  const [date, setDate] = useState(dateOptions()[0]);
  const [time, setTime] = useState(times[1]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Tiền mặt");
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const service = mockServices.find((item) => item.id === serviceId) ?? mockServices[0];
  const pet = pets.find((item) => item.id === petId);
  const clinic = mockClinics.find((item) => item.id === clinicId) ?? mockClinics[0];
  const selectedAddOns = service.addOns.filter((item) => addOnIds.includes(item.id));
  const total = service.price + selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const dates = useMemo(dateOptions, []);

  const toggleAddOn = (id: string) => setAddOnIds((previous) =>
    previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);

  const next = () => {
    if (step === 1 && !pet) {
      Alert.alert("Chưa có thú cưng", "Vui lòng thêm hồ sơ thú cưng trước khi đặt lịch.");
      return;
    }
    if (step < 3) setStep((previous) => previous + 1);
  };

  const confirmBooking = async () => {
    if (!pet) {
      Alert.alert("Thiếu thông tin", "Vui lòng chọn thú cưng cho lịch hẹn.");
      return;
    }
    setSubmitting(true);
    const booking: Booking = {
      id: `BK-${Date.now().toString().slice(-6)}`,
      petId: pet.id,
      petName: pet.name,
      serviceId: service.id,
      serviceName: service.name,
      clinicId: clinic.id,
      clinicName: clinic.name,
      clinicAddress: clinic.address,
      clinicPhone: clinic.phone,
      staffName,
      date,
      time,
      addOnNames: selectedAddOns.map((item) => item.name),
      total,
      paymentMethod,
      status: "upcoming",
      createdAt: todayISO(),
    };
    try {
      const saved = await bookingApi.createBooking(booking);
      addBooking(saved);
      Alert.alert("Đặt lịch thành công 🎉", `Mã lịch hẹn ${saved.id} đã được tạo. Đây là mã QR thanh toán giả lập.`, [
        { text: "Tiến hành thanh toán", onPress: () => navigation.navigate("Checkout", { total: saved.total }) },
      ]);
    } catch (error) {
      Alert.alert("Không thể đặt lịch", error instanceof Error ? error.message : "Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Header title="Đặt dịch vụ" subtitle="Chọn dịch vụ phù hợp cho bé yêu" />
      <View style={styles.progress}>
        {["Dịch vụ", "Thú cưng", "Thời gian", "Xác nhận"].map((label, index) => (
          <View key={label} style={styles.progressItem}>
            <View style={[styles.progressDot, index <= step && styles.progressActive]}><Text style={[styles.progressNumber, index <= step && styles.progressNumberActive]}>{index + 1}</Text></View>
            <Text style={[styles.progressLabel, index === step && styles.progressLabelActive]}>{label}</Text>
          </View>
        ))}
      </View>

      {step === 0 ? (
        <View>
          <Text style={styles.heading}>Chọn dịch vụ</Text>
          {mockServices.map((item) => (
            <Pressable key={item.id} onPress={() => { setServiceId(item.id); setAddOnIds([]); }} style={[styles.optionCard, serviceId === item.id && styles.selectedCard]}>
              <View style={[styles.serviceIcon, serviceId === item.id && styles.selectedIcon]}><MaterialCommunityIcons name={item.icon as any} size={23} color={serviceId === item.id ? "#fff" : colors.teal} /></View>
              <View style={styles.optionCopy}><Text style={styles.optionTitle}>{item.name}</Text><Text style={styles.optionSub}>{item.description}</Text></View>
              <Text style={styles.optionPrice}>{formatCurrency(item.price)}</Text>
            </Pressable>
          ))}
          <Text style={styles.heading}>Dịch vụ bổ sung</Text>
          {service.addOns.map((item) => (
            <Pressable key={item.id} onPress={() => toggleAddOn(item.id)} style={styles.addOnRow}>
              <MaterialCommunityIcons name={addOnIds.includes(item.id) ? "checkbox-marked" : "checkbox-blank-outline"} size={22} color={addOnIds.includes(item.id) ? colors.teal : colors.muted} />
              <Text style={styles.addOnName}>{item.name}</Text><Text style={styles.addOnPrice}>{item.price ? `+ ${formatCurrency(item.price)}` : "Miễn phí"}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {step === 1 ? (
        <View>
          <Text style={styles.heading}>Dịch vụ cho bé nào?</Text>
          {pets.map((item) => (
            <Pressable key={item.id} onPress={() => setPetId(item.id)} style={[styles.optionCard, petId === item.id && styles.selectedCard]}>
              <Text style={styles.petEmoji}>{item.species === "Mèo" ? "🐱" : "🐶"}</Text>
              <View style={styles.optionCopy}><Text style={styles.optionTitle}>{item.name}</Text><Text style={styles.optionSub}>{item.breed} · {item.age} tuổi · {item.weight} kg</Text></View>
              <MaterialCommunityIcons name={petId === item.id ? "radiobox-marked" : "radiobox-blank"} size={22} color={colors.teal} />
            </Pressable>
          ))}
          <Button title="Thêm thú cưng mới" variant="outline" onPress={() => navigation.navigate("AddPet")} style={{ marginTop: 5 }} />
        </View>
      ) : null}

      {step === 2 ? (
        <View>
          <Text style={styles.heading}>Phòng khám & nhân viên</Text>
          {mockClinics.map((item) => (
            <Pressable key={item.id} onPress={() => setClinicId(item.id)} style={[styles.clinicOption, clinicId === item.id && styles.selectedCard]}>
              <View style={styles.optionCopy}><Text style={styles.optionTitle}>{item.name}</Text><Text style={styles.optionSub}>{item.address}</Text><Text style={styles.rating}>★ {item.rating} · {item.reviewCount} đánh giá</Text></View>
              <MaterialCommunityIcons name={clinicId === item.id ? "radiobox-marked" : "radiobox-blank"} size={22} color={colors.teal} />
            </Pressable>
          ))}
          <Text style={styles.subheading}>Chọn bác sĩ / kỹ thuật viên</Text>
          <View style={styles.wrapRow}>{staffOptions.map((staff) => <Pill key={staff} label={staff} selected={staffName === staff} onPress={() => setStaffName(staff)} />)}</View>
          <Text style={styles.subheading}>Chọn ngày</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateRow}>
            {dates.map((item) => <Pressable key={item} onPress={() => setDate(item)} style={[styles.dateOption, date === item && styles.dateSelected]}><Text style={[styles.dateWeek, date === item && styles.dateTextSelected]}>{new Intl.DateTimeFormat("vi-VN", { weekday: "short" }).format(new Date(`${item}T00:00:00`))}</Text><Text style={[styles.dateDay, date === item && styles.dateTextSelected]}>{item.slice(-2)}</Text></Pressable>)}
          </ScrollView>
          <Text style={styles.subheading}>Khung giờ</Text>
          <View style={styles.wrapRow}>{times.map((item) => <Pill key={item} label={item} selected={time === item} onPress={() => setTime(item)} />)}</View>
        </View>
      ) : null}

      {step === 3 ? (
        <View>
          <Text style={styles.heading}>Xác nhận thông tin</Text>
          <View style={styles.summaryCard}>
            <SummaryLine label="Dịch vụ" value={service.name} />
            <SummaryLine label="Thú cưng" value={pet?.name ?? "Chưa chọn"} />
            <SummaryLine label="Phòng khám" value={clinic.name} />
            <SummaryLine label="Nhân viên" value={staffName} />
            <SummaryLine label="Thời gian" value={`${formatDate(date)} · ${time}`} />
            {selectedAddOns.map((item) => <SummaryLine key={item.id} label={item.name} value={formatCurrency(item.price)} />)}
            <View style={styles.separator} />
            <SummaryLine label="Tạm tính" value={formatCurrency(total)} strong />
          </View>
          <Text style={styles.heading}>Phương thức thanh toán</Text>
          {paymentOptions.map((method) => (
            <Pressable key={method} onPress={() => setPaymentMethod(method)} style={styles.paymentRow}>
              <MaterialCommunityIcons name={paymentMethod === method ? "radiobox-marked" : "radiobox-blank"} size={22} color={colors.teal} />
              <Text style={styles.paymentText}>{method === "MoMo" ? "Ví MoMo" : method === "VNPay" ? "VNPay / ngân hàng" : "Thanh toán tại phòng khám"}</Text>
              <Text style={styles.paymentBrand}>{method}</Text>
            </Pressable>
          ))}
          {paymentMethod !== "Tiền mặt" ? <View style={styles.qrBox}><QrPattern /><Text style={styles.qrNote}>QR thanh toán minh họa · Không phát sinh giao dịch thật</Text></View> : null}
          <Text style={styles.disclaimer}>Lịch hẹn chỉ được ghi nhận sau khi bạn xác nhận. Thanh toán trong ứng dụng là mô phỏng.</Text>
        </View>
      ) : null}

      <View style={styles.footer}>
        {step > 0 ? <Button title="Quay lại" variant="outline" onPress={() => setStep((previous) => previous - 1)} style={styles.footerButton} /> : null}
        {step < 3
          ? <Button title="Tiếp tục" onPress={next} style={styles.footerButton} />
          : <Button title={`Xác nhận · ${formatCurrency(total)}`} onPress={confirmBooking} loading={submitting} style={styles.footerButton} />}
      </View>
    </ScrollView>
  );
}

function Pill({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.pill, selected && styles.pillSelected]}><Text style={[styles.pillText, selected && styles.pillTextSelected]}>{label}</Text></Pressable>;
}

function SummaryLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <View style={styles.summaryLine}><Text style={[styles.summaryLabel, strong && styles.strong]}>{label}</Text><Text style={[styles.summaryValue, strong && styles.strong]}>{value}</Text></View>;
}

function QrPattern() {
  const cells = Array.from({ length: 100 }, (_, index) => {
    const row = Math.floor(index / 10);
    const column = index % 10;
    const inFinder = (row < 3 && column < 3) || (row < 3 && column > 6) || (row > 6 && column < 3);
    return inFinder || ((row * 7 + column * 11 + row * column) % 4 !== 0);
  });
  return <View style={styles.qr}>{cells.map((filled, index) => <View key={index} style={[styles.qrCell, filled && styles.qrFilled]} />)}</View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 15, paddingBottom: 30 },
  progress: { flexDirection: "row", justifyContent: "space-between", marginBottom: 23 },
  progressItem: { alignItems: "center", gap: 6 },
  progressDot: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#E9EFED", alignItems: "center", justifyContent: "center" },
  progressActive: { backgroundColor: colors.teal },
  progressNumber: { color: colors.muted, fontSize: 12, fontWeight: "800" },
  progressNumberActive: { color: "#fff" },
  progressLabel: { color: colors.muted, fontSize: 10 },
  progressLabelActive: { color: colors.tealDark, fontWeight: "800" },
  heading: { color: colors.ink, fontSize: 17, fontWeight: "800", marginBottom: 12, marginTop: 4 },
  subheading: { color: colors.ink, fontSize: 14, fontWeight: "700", marginTop: 18, marginBottom: 10 },
  optionCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 13, gap: 11, marginBottom: 10 },
  selectedCard: { borderColor: colors.teal, backgroundColor: "#F1FAF8" },
  serviceIcon: { width: 42, height: 42, alignItems: "center", justifyContent: "center", borderRadius: 14, backgroundColor: colors.mint },
  selectedIcon: { backgroundColor: colors.teal },
  optionCopy: { flex: 1, gap: 4 },
  optionTitle: { color: colors.ink, fontSize: 14, fontWeight: "800" },
  optionSub: { color: colors.muted, fontSize: 11, lineHeight: 16 },
  optionPrice: { color: colors.tealDark, fontSize: 12, fontWeight: "800" },
  addOnRow: { flexDirection: "row", alignItems: "center", gap: 9, paddingVertical: 10 },
  addOnName: { flex: 1, color: colors.ink, fontSize: 13 },
  addOnPrice: { color: colors.muted, fontSize: 12 },
  petEmoji: { fontSize: 30, width: 42, textAlign: "center" },
  clinicOption: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 13, gap: 8, marginBottom: 9 },
  rating: { color: "#E89A37", fontSize: 11, fontWeight: "700" },
  wrapRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: { paddingHorizontal: 12, paddingVertical: 10, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, borderRadius: 13 },
  pillSelected: { backgroundColor: colors.mint, borderColor: colors.teal },
  pillText: { color: colors.ink, fontSize: 12, fontWeight: "600" },
  pillTextSelected: { color: colors.tealDark, fontWeight: "800" },
  dateRow: { gap: 8 },
  dateOption: { width: 53, alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingVertical: 10, gap: 6 },
  dateSelected: { backgroundColor: colors.teal, borderColor: colors.teal },
  dateWeek: { color: colors.muted, fontSize: 10 },
  dateDay: { color: colors.ink, fontSize: 16, fontWeight: "800" },
  dateTextSelected: { color: "#fff" },
  summaryCard: { backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, borderRadius: 17, padding: 15, marginBottom: 21 },
  summaryLine: { flexDirection: "row", justifyContent: "space-between", gap: 10, paddingVertical: 7 },
  summaryLabel: { color: colors.muted, fontSize: 12 },
  summaryValue: { color: colors.ink, fontSize: 12, fontWeight: "700", textAlign: "right", flexShrink: 1 },
  strong: { color: colors.tealDark, fontSize: 14, fontWeight: "800" },
  separator: { height: 1, backgroundColor: colors.border, marginVertical: 7 },
  paymentRow: { flexDirection: "row", alignItems: "center", gap: 9, paddingVertical: 12, borderBottomWidth: 1, borderColor: colors.border },
  paymentText: { flex: 1, color: colors.ink, fontSize: 13 },
  paymentBrand: { color: colors.muted, fontSize: 11, fontWeight: "700" },
  qrBox: { alignItems: "center", gap: 10, padding: 16, backgroundColor: "#fff", borderRadius: 16, marginTop: 15, borderWidth: 1, borderColor: colors.border },
  qr: { width: 110, height: 110, padding: 7, flexDirection: "row", flexWrap: "wrap", backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border },
  qrCell: { width: "10%", height: "10%", backgroundColor: "#fff" },
  qrFilled: { backgroundColor: colors.ink },
  qrNote: { color: colors.muted, textAlign: "center", fontSize: 10 },
  disclaimer: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 12 },
  footer: { flexDirection: "row", gap: 10, marginTop: 22 },
  footerButton: { flex: 1 },
});
