import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMainStore } from '../../stores/useMainStore';
import { sv } from 'date-fns/locale';

export function DatePicker() {
  const store = useMainStore();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [enabledDates, setEnabledDates] = useState<number[]>(store.couponDates ?? []);

  const fetchDates = async (date?: Date) => {
    await store.fetchCouponDates(date);

    if (store.couponDates) {
      setEnabledDates(store.couponDates);
    }
  };

  const filterDates = (date: Date) => {
    return enabledDates.includes(date.getTime());
  };

  const handleDateChange = (date: Date) => {
    if (date && filterDates(date)) {
      setSelectedDate(date);

      const drawNumber = store.dateResponse?.find(
        (p) => new Date(p.date).getTime() === date.getTime(),
      )?.drawNumber;

      if (drawNumber) {
        store.fetchResult(drawNumber);
      }
    } else {
      setSelectedDate(null);
      store.clearResults();
    }
  };

  return (
    <ReactDatePicker
      calendarStartDay={1}
      selected={selectedDate}
      onChange={handleDateChange}
      onMonthChange={fetchDates}
      onCalendarOpen={fetchDates}
      filterDate={filterDates}
      dateFormat="yyyy-MM-dd"
      placeholderText="Tidigare kuponger"
      clearButtonTitle="Rensa resultat"
      maxDate={new Date()}
      isClearable
      locale={sv}
      weekLabel="v."
      showWeekNumbers
    />
  );
}
