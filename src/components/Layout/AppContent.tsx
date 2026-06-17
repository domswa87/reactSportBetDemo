import { Typography } from "@mui/material";

type AppContentProps = {
    activeTopItem: string
    activeSideItem: string
}

function AppContent({ activeTopItem, activeSideItem }: AppContentProps) {
    return (
        <>
        <Typography variant="h6" gutterBottom>
          {activeTopItem}
        </Typography>
        <Typography color="text.secondary">
          {activeSideItem}
        </Typography>
      </>
    )
  }

  export default AppContent;