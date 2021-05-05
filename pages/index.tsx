import * as React from 'react'
import { AxiosError } from 'axios'

import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
  UseQueryOptions,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const client = new QueryClient()

// initial call returns true
async function fetchBool(): Promise<boolean> {
  return await Promise.resolve(true)
}

// hook to get the value stored at the 'bool' key
function useBool(options?: UseQueryOptions<any, AxiosError, any>) {
  return useQuery('bool', fetchBool, options)
}

function Example() {
  const queryClient = useQueryClient()
  const { isFetching: boolIsFetching, ...boolQueryInfo } = useBool()

  // take a value and resolve that value
  // on success set the query data of the 'bool' index to be the passed value
  const boolFlip = (val: any) => new Promise(resolve => resolve(val))
  const addBoolMutation = useMutation(boolFlip, {
    onSuccess: data => {
      queryClient.setQueryData('bool', data)
    },
  })

  // function that calls the flip mutation
  const toggleBool = () => addBoolMutation.mutate(!!!boolQueryInfo?.data)
  return (
    <div>
      <div>example: {`${boolQueryInfo.data}`}</div>
      <button onClick={toggleBool}>toggle</button>cd 
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Example />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}
