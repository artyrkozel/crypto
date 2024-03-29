import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            onError: error => {
                if (error) {
                    console.log(error)
                }
            },
            retry: 0,
            refetchOnWindowFocus: false,
        }
    }
  })

type QueryClientProviderProps = {
    children: React.ReactNode;
  };

  const ReactQueryProvider = ({children}: QueryClientProviderProps) => {
    
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
  }

  export default ReactQueryProvider