// Calendar.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  max-width: 360px;
  margin: auto;
  background-color: #f7f7f7;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #003366;
  margin-bottom: 1rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 360px;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: transparent;
  color: #003366;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #00509e;
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 10px;
  width: 100%;
`;

const DayBox = styled.div`
  font-weight: bold;
  text-align: center;
  color: #555;
`;

const Day = styled.div`
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  background-color: ${({ isSelected }) => (isSelected ? 'lightblue' : 'lightgray')};
  color: ${({ isToday }) => (isToday ? '#004080' : '#333')};
  font-weight: ${({ isToday }) => (isToday ? 'bold' : 'normal')};
  &:hover {
    background-color: #d0e4f7;
  }
`;

const Modal = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(${({ isVisible }) => (isVisible ? '0' : '100%')});
  height: 50vh;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  width: 100%;
  max-width: 360px;
  transition: transform 0.3s ease-in-out;
`;

const NoteTitle = styled.h3`
  font-size: 1.2rem;
  color: #003366;
  text-align: center;
  margin-bottom: 1rem;
`;

const NoteInput = styled.textarea`
  width: calc(100% - 20px);
  height: 60px;
  padding: 10px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  box-sizing: border-box;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
`;

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setCurrentMonth(new Date());
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleNoteChange = (e) => {
    setNotes({
      ...notes,
      [selectedDate]: e.target.value,
    });
  };

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = getDaysInMonth(year, month);
    const today = new Date().toDateString();

    return days.map((date) => (
      <Day
        key={date}
        onClick={() => handleDateClick(date.toDateString())}
        isSelected={selectedDate === date.toDateString()}
        isToday={date.toDateString() === today}
      >
        {date.getDate()}
      </Day>
    ));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <CalendarContainer>
      <NavigationButtons>
        <Button onClick={handlePreviousMonth}>&lt;</Button>
        <Title>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </Title>
        <Button onClick={handleNextMonth}>&gt;</Button>
      </NavigationButtons>
      <DaysGrid>
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <DayBox key={day}>{day}</DayBox>
        ))}
        {renderCalendar()}
      </DaysGrid>

      <Modal isVisible={isModalVisible}>
        <CloseButton onClick={() => setModalVisible(false)}>&times;</CloseButton>
        <NoteTitle>{selectedDate}의 메모</NoteTitle>
        <NoteInput
          value={notes[selectedDate] || ''}
          onChange={handleNoteChange}
          placeholder="내용을 입력하세요..."
        />
      </Modal>
    </CalendarContainer>
  );
}
