import { Button, Container, Group, Stack, TextInput, Title, Text, Space, Divider, UnstyledButton } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'
import { useQuery } from 'react-query'

type SearchResult = {
  id: number,
  url: string,
  visited: boolean,
  heading?: string,
  description?: string,
  body?: string,
}

type SearchQueryResult = {
  count: number,
  results: SearchResult[]
}

const SearchResultBox = ({result}: {result: SearchResult}) => {
  return (
    <UnstyledButton onClick={() => window.open(result.url, "_blank")}>
      <Stack spacing="md" >
        <Title order={2}>{result.heading}</Title>
        <Title order={3}>{result.description}</Title>
        <Text lineClamp={3}>{result.body}</Text>
      </Stack>
    </UnstyledButton>
  )  
}
const fetchSearchResults = async(query: string): Promise<SearchQueryResult> => {
  const response = await axios.get(`https://s.puida.xyz/page/search/?q=${query}`)
  return response.data
}

const Home: NextPage = () => {
  const [pesquisa, setPesquisa] = useInputState('')
  const [query, setQuery] = useState('')

  const queryResponse = useQuery(['results', query], () => fetchSearchResults(query))

  if (queryResponse.isError) {
    return (
      <Container>
        <Group sx={{marginBottom: "20px"}}>
          <TextInput placeholder='Insira sua pesquisa aqui' value={pesquisa} onChange={setPesquisa}/>
          <Button onClick={() => setQuery(pesquisa)}>Pesquisar</Button>
          <Text>{queryResponse.data?.count ?? "n/a"} Resultados</Text>
        </Group>
        <Title color='red'>Erro ao pesquisar. Tente novamente</Title>
      </Container>
    )
  }

  return (
    <Container>
      <Group sx={{marginBottom: "20px"}}>
        <TextInput placeholder='Insira sua pesquisa aqui' value={pesquisa} onChange={setPesquisa}/>
        <Button onClick={() => setQuery(pesquisa)}>Pesquisar</Button>
        <Text>{queryResponse.data?.count ?? "n/a"} Resultados</Text>
      </Group>
      {queryResponse.data?.results && (
        queryResponse.data.results.map((result) => (
          <>
            <SearchResultBox result={result} key={result.id}/>
            <Divider sx={{margin: "10px"}}/>
          </>
        ))
      )}
    </Container>
  )
}

export default Home
