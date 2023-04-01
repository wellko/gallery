import React from 'react';
import {Button, Dialog, DialogActions} from "@mui/material";

export interface SimpleDialogProps {
	open: boolean;
	onClose: () => void;
	url: string;
}

const DialogItem:React.FC<SimpleDialogProps> = ({open,onClose, url}) => {
	return (
		<Dialog onClose={onClose} open={open} maxWidth='md' fullWidth>
			<img src={url} alt='photo' width='100%'/>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DialogItem;