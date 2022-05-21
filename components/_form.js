import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import objectSupport from 'dayjs/plugin/objectSupport';
import toObject from 'dayjs/plugin/toObject';
dayjs.extend(localizedFormat);
dayjs.extend(objectSupport);
dayjs.extend(toObject);
import { Button, SimpleGrid, Text } from '@mantine/core';
import { TimeInput, DatePicker } from '@mantine/dates';

export default function Form() {
  const [dt, setDt] = useState(null);
  const [showDiscordFormat, setShowDiscordFormat] = useState(false);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    setDt(dayjs());

    const timer = setInterval(() => {
      setDt(dayjs());
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const getTimeObject = (obj) => {
    const { time, date } = selected;
    const d = dt && dt.toObject();

    const parsed = dayjs({
      y: (date && date.years) || (d && d.years),
      M: (date && date.months) || (d && d.months),
      d: (date && date.date) || (d && d.date),
      h: (time && time.hours) || (d && d.hours),
      m: (time && time.minutes) || (d && d.minutes),
      s: (time && time.seconds) || (d && d.seconds),
      ms: (time && time.milliseconds) || (d && d.milliseconds),
    });

    return parsed;
  };

  const sendToClipboard = (format) => {
    const parsed = getTimeObject().unix();

    switch (format) {
      case 'default': {
        parsed = `<t:${parsed}>`;
        break;
      }
      case 'shortTime': {
        parsed = `<t:${parsed}:t>`;
        break;
      }
      case 'shortDate': {
        parsed = `<t:${parsed}:d>`;
        break;
      }
      default: {
        parsed = null;
      }
    }
    return navigator.clipboard.writeText(parsed);
  };

  return (
    <>
      <Text mb="md">
        Current date and time is: <b>{dt && dt.format('LL LTS')}</b>
      </Text>
      <form>
        <DatePicker
          label="Select Date"
          allowFreeInput
          dateParser
          onChange={(d) => setSelected({ ...selected, date: dayjs(d).toObject() })}
        />
        <TimeInput
          label="Pick a Time"
          format="12"
          onChange={(d) => setSelected({ ...selected, time: dayjs(d).toObject() })}
        />
        <Button mt="md" onClick={() => setSelected({})}>
          Use current time
        </Button>
      </form>
      <Text my="md">
        Select your date/time format
        <Button sx={{ float: 'right', background: 'none' }} onClick={() => setShowDiscordFormat(!showDiscordFormat)}>
          {showDiscordFormat ? 'Hide' : 'Show'} Discord Format
        </Button>
      </Text>
      <SimpleGrid cols={2}>
        <Button sx={styles} onClick={() => sendToClipboard('default')}>
          {showDiscordFormat && '<t:1543392060> | '}
          {dayjs(getTimeObject()).format('LLL')}
        </Button>
        <Button sx={styles} onClick={() => sendToClipboard('shortTime')}>
          {showDiscordFormat && '<t:1543392060:t> | '}
          {dayjs(getTimeObject()).format('LT')}
        </Button>
        <Button sx={styles} onClick={() => sendToClipboard('shortDate')}>
          {showDiscordFormat && '<t:1543392060:d> | '}
          {dayjs(getTimeObject()).format('L')}
        </Button>
      </SimpleGrid>
    </>
  );
}

const styles = (theme) => ({
  backgroundColor: theme.colors.dark[5],
});
