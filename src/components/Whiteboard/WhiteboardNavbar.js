import { Grid, Hidden, IconButton, makeStyles } from '@material-ui/core';
import {
  Clear,
  Delete as DeleteIcon,
  DeleteForever,
  Fullscreen,
  FullscreenExit,
  Gesture as GestureIcon,
  PanTool as PanToolIcon,
  Redo as RedoIcon,
  Save as SaveIcon,
  TextFields as TextFieldsIcon,
  Undo as UndoIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  addNewTextNode,
  changeMode,
  deselectNodes,
  redo,
  removeAllNodes,
  removeSelectedNodes,
  undo,
} from '../../redux/actions/whiteboard';
import downloadFromURL from '../../utils/downloadFromURL';
import DrawingModes from '../Konva/Drawing/DrawingModes';
import CircleMenu from './Components/CircleMenu';
import RectangleMenu from './Components/RectangleMenu';
import RemoveAllNodesDialog from './Components/RemoveAllNodesDialog';

const useStyles = makeStyles((theme) => ({
  whiteboardNavbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: theme.spacing(1),
    zIndex: 3,
    '& .MuiIconButton-root': {
      position: 'relative',
      pointerEvents: 'auto',
    },
  },
}));

function WhiteboardNavbar({
  drawingMode,
  addNewTextNode,
  changeMode,
  removeSelectedNodes,
  deselectNodes,
  removeAllNodes,
  undo,
  redo,
  getDataURL,
  handleClose,
  isFullScreen,
  setIsFullScreen,
}) {
  const classes = useStyles();
  const [openRemoveNodes, setOpenRemoveNodes] = useState(false);

  return (
    <Grid
      container
      justify="space-between"
      className={classes.whiteboardNavbar}>
      <Grid item>
        <IconButton onClick={handleClose}>
          <Clear />
        </IconButton>
        <Hidden smDown>
          <IconButton onClick={() => setIsFullScreen(!isFullScreen)}>
            {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
        </Hidden>
        <IconButton
          onClick={() => {
            downloadFromURL(getDataURL(), 'stage.png');
          }}>
          <SaveIcon />
        </IconButton>
        <IconButton onClick={() => setOpenRemoveNodes(true)}>
          <DeleteForever style={{ color: 'red' }} />
        </IconButton>
        <RemoveAllNodesDialog
          open={openRemoveNodes}
          handleClose={() => setOpenRemoveNodes(false)}
          removeAllNodes={removeAllNodes}
        />
      </Grid>
      <Grid item>
        <IconButton
          color={drawingMode === DrawingModes.DELETE ? 'primary' : 'default'}
          onClick={() => {
            changeMode(DrawingModes.DELETE);
            removeSelectedNodes();
          }}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={redo}>
          <RedoIcon />
        </IconButton>
        <IconButton onClick={undo}>
          <UndoIcon />
        </IconButton>
        <IconButton
          color={drawingMode === DrawingModes.PAINTING ? 'primary' : 'default'}
          onClick={() => {
            deselectNodes();
            changeMode(DrawingModes.PAINTING);
          }}>
          <GestureIcon />
        </IconButton>
        <CircleMenu />
        <RectangleMenu />
        <IconButton
          onClick={() => {
            changeMode(DrawingModes.MOVE);
            addNewTextNode();
          }}>
          <TextFieldsIcon />
        </IconButton>
        <IconButton
          color={drawingMode === DrawingModes.MOVE ? 'primary' : 'default'}
          onClick={() => changeMode(DrawingModes.MOVE)}>
          <PanToolIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  drawingMode: state.whiteboard.present.mode,
  canUndo: state.whiteboard.past.length > 0,
  canRedo: state.whiteboard.future.length > 0,
});

export default connect(mapStateToProps, {
  addNewTextNode,
  changeMode,
  removeSelectedNodes,
  deselectNodes,
  removeAllNodes,
  undo,
  redo,
})(WhiteboardNavbar);
