import { useState } from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Button
        variant="contained"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </Button>
    </Stack>
  )
}

export default App
