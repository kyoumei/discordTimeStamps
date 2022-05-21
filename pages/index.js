import Head from 'next/head';
import { Container, Title, Text, Center } from '@mantine/core';
import Form from '../components/_form';

export default function Home() {
  return (
    <>
      <Head>
        <title>Discord - Time to Unixstamp Converter</title>
        <meta name="description" content="Discord Time Converter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container size="sm">
        <Title mt="md">Discord - Time to Unix Converter</Title>
        <Text mb="md">
          Quickly convert times into unix timestamps that automatically convert to local timestamps based on a user
          {`&apos;`}s local time on discord.
        </Text>
        <Title order={4}>How to use?</Title>
        <Text my="md">
          Click one of the buttons below, to copy that format to your clipboard with time selected. Not selecting a
          time, will use current time instead.
        </Text>
        <Text mb="md">
          Once copied to clipboard, send the paste to discord and time will automatically be converted.
        </Text>
        <Form />
      </Container>
    </>
  );
}
