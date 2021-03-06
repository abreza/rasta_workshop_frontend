import { IconButton, makeStyles, withWidth } from '@material-ui/core';
import {
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
} from '@material-ui/icons';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { StatePageContext } from '../../containers/Workshop';
import * as jitsiFuncs from './connection/jitsi';

const useStyles = makeStyles((theme) => ({
  draggableArea: {
    width: '100%',
    background: '#666',
    boxShadow: theme.shadows[10],
    padding: theme.spacing(0, 2),
    cursor: 'move',
    display: 'flex',
    alignItems: 'center',
  },
  rightItems: {
    marginLeft: 'auto',
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  },
  jitsi: {
    width: '100%',
    height: 300,
    [theme.breakpoints.down('xs')]: {
      height: '100vh',
    },
  },
}));
function Jitsi({ handleClose, width, displayName = 'User' }) {
  const classes = useStyles();
  const jitsiElement = useRef();

  const { player } = useContext(StatePageContext);

  const refresh = useCallback(() => {
    if (player.uuid) {
      jitsiFuncs.destroy();
      jitsiFuncs.initJitsi({
        roomName: 'ra_' + player.uuid,
        parentNode: jitsiElement.current,
        height: width === 'xs' ? '100%' : '300px',
        userInfo: {
          displayName,
        },
      });
    }
  }, [width, displayName, player.uuid]);

  useEffect(() => {
    setTimeout(() => {
      refresh();
    }, 100);
    return jitsiFuncs.destroy;
  }, [refresh]);

  return (
    <>
      <div id="jitsi-draggable-area" className={classes.draggableArea}>
        <IconButton size="small" onClick={handleClose}>
          <CancelIcon color="error" />
        </IconButton>
        <div className={classes.rightItems}>
          <IconButton size="small" onClick={refresh}>
            <RefreshIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.jitsi} ref={jitsiElement}></div>
    </>
  );
}

const mapStatesToProps = (state) => ({
  displayName: state.account.user.is_mentor ? 'منتور' : state.account.user.name,
});

export default withWidth()(connect(mapStatesToProps)(Jitsi));
