import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SuccessSnackbar } from '@/app/components/Snackbar';

type Props = {
    preview: string | ArrayBuffer | null;
    isOpen: boolean;
    message: string;
    handleClose: () => void;
    handleNameChange: (e: any) => void;
    handleImageChange: (e: any) => void;
    handleOnClick: () => void;
}

// styled conmponent
const VisuallyHiddenInput = styled('input')({
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
  const NftMintPageContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width:'80%',
    margin: '0 auto',
    maxWidth: '500px',
  });
  
  const Preview = styled('img')({
    width: '100%',
    height: '100%',
  });
  
export const MintForm: React.FC<Props> = ({
    preview, 
    handleNameChange, 
    handleImageChange, 
    handleOnClick,
    isOpen,
    message,
    handleClose
}: Props) => {
  return (
    <NftMintPageContainer>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <TextField required fullWidth label="NFTの名前" id="name" onChange={handleNameChange}/>
      </Box>
      {preview && <Preview src={preview as string} alt="preview" />}
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput required type="file" onChange={handleImageChange}/>
      </Button>
      <Button variant="contained" onClick={handleOnClick}>Mint</Button>
      <SuccessSnackbar isOpen={isOpen} message={message} handleClose={handleClose} />
    </NftMintPageContainer>
  )
}