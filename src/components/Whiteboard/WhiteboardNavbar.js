import { Grid, IconButton, makeStyles } from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Gesture as GestureIcon,
  PanTool as PanToolIcon,
  Redo as RedoIcon,
  Save as SaveIcon,
  TextFields as TextFieldsIcon,
  Undo as UndoIcon,
} from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import {
  addNewTextNode,
  addNewRectangleNode,
  changeMode,
  removeSelectedNodes,
  deselectNodes,
} from '../../redux/actions/whiteboard';
import downloadFromURL from '../../utils/downloadFromURL';
import DrawingModes from '../Konva/Drawing/DrawingModes';
import CircleMenu from './Components/CircleMenu';
import RectangleMenu from './Components/RectangleMenu';

const useStyles = makeStyles((theme) => ({
  whiteboardNavbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: theme.spacing(1),
    zIndex: 3,
    pointerEvents: 'none',
    '& .MuiIconButton-root': {
      position: 'relative',
      pointerEvents: 'auto',
    },
  },
}));

function WhiteboardNavbar({
  drawingMode,
  addNewTextNode,
  addNewRectangleNode,
  changeMode,
  removeSelectedNodes,
  deselectNodes,
  onUndo,
  onRedo,
  getDataURL,
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-between"
      className={classes.whiteboardNavbar}>
      <Grid item>
        <IconButton
          onClick={() => {
            downloadFromURL(getDataURL(), 'stage.png');
          }}>
          <SaveIcon />
        </IconButton>
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
        <IconButton onClick={onRedo}>
          <RedoIcon />
        </IconButton>
        <IconButton onClick={onUndo}>
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
  addNewRectangleNode,
  changeMode,
  removeSelectedNodes,
  deselectNodes,
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo,
})(WhiteboardNavbar);
