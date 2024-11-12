import saveAs from "file-saver";
import JSZip from "jszip";
import { resize, resizeOne } from "@derivv/core";

// ------------------------------------
// Constants
// ------------------------------------
export const DERIVATIVE_START = "DERIVATIVE_START";
export const DERIVATIVE_STOP = "DERIVATIVE_STOP";
export const DERIVATIVE_ADD = "DERIVATIVE_ADD";
export const DERIVATIVE_UPDATE = "DERIVATIVE_UPDATE";
export const DERIVATIVE_CLEAR_ALL = "DERIVATIVE_CLEAR_ALL";
export const DERIVATIVE_DOWNLOAD_ALL = "DERIVATIVE_DOWNLOAD_ALL";
export const DERIVATIVE_ENABLE_DOWNLOAD = "DERIVATIVE_ENABLE_DOWNLOAD";
export const DERIVATIVE_DISABLE_DOWNLOAD = "DERIVATIVE_DISABLE_DOWNLOAD";
export const DERIVATIVE_ADD_ERRORS = "DERIVATIVE_ADD_ERRORS";
export const DERIVATIVE_CLEAR_ERRORS = "DERIVATIVE_CLEAR_ERRORS";
// ------------------------------------
// Actions
// ------------------------------------
export function start(id = true) {
  return {
    type: DERIVATIVE_START,
    acting: id,
  };
}

export function stop() {
  return {
    type: DERIVATIVE_STOP,
    acting: false,
  };
}

export function add(derivative) {
  return {
    type: DERIVATIVE_ADD,
    payload: derivative,
  };
}

export function update(derivative) {
  return {
    type: DERIVATIVE_UPDATE,
    payload: derivative,
  };
}

export function clearAll() {
  return {
    type: DERIVATIVE_CLEAR_ALL,
  };
}

export function enableDownload() {
  return {
    type: DERIVATIVE_ENABLE_DOWNLOAD,
  };
}

export function disableDownload() {
  return {
    type: DERIVATIVE_DISABLE_DOWNLOAD,
  };
}

export function downloadAll() {
  return {
    type: DERIVATIVE_DOWNLOAD_ALL,
  };
}

export function addErrors(errors) {
  return {
    type: DERIVATIVE_ADD_ERRORS,
    payload: errors,
  };
}

export function clearErrors() {
  return {
    type: DERIVATIVE_CLEAR_ERRORS,
  };
}

export function processAll(image, configs) {
  return async (dispatch) => {
    dispatch(start());
    dispatch(clearAll());
    dispatch(clearErrors());
    const errors = [];

    for (const config of configs) {
      try {
        const _image = await resizeOne(image, config);

        _image.id = config.id;
        dispatch(add(_image));
      } catch (error) {
        errors.push(error);
      }
    }

    dispatch(stop());
    dispatch(enableDownload());
    dispatch(addErrors(errors));
  };
}

export function processOne(image, config) {
  return async (dispatch) => {
    dispatch(start(config.id));
    dispatch(disableDownload());
    dispatch(clearErrors());

    let _image = null

    try {
      _image = await resizeOne(image, config, {
        cropCoordinates: { x: config.x, y: config.y },
        metadata: { name: config.name },
      });

      _image.id = config.id;
    } catch (error) {
      dispatch(addErrors([error]));
    }

    dispatch(update(_image));
    dispatch(stop());
    dispatch(enableDownload());
  };
}

export const actions = {
  add,
  clearAll,
  enableDownload,
  downloadAll,
  clearErrors,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DERIVATIVE_START]: (state, action) => {
    return { ...state, acting: action.acting, errors: null };
  },
  [DERIVATIVE_STOP]: (state, action) => {
    return { ...state, acting: action.acting };
  },
  [DERIVATIVE_ADD]: (state, action) => {
    if (state.images.filter((d) => d.id === action.payload.id).length > 0) {
      return state;
    }

    return { ...state, images: state.images.concat(action.payload) };
  },
  [DERIVATIVE_UPDATE]: (state, action) => {
    const images = state.images.map((d) => {
      return d.id === action.payload.id ? action.payload : d;
    });

    return { ...state, images };
  },
  [DERIVATIVE_CLEAR_ALL]: (state, action) => {
    return { ...state, images: [] };
  },
  [DERIVATIVE_ENABLE_DOWNLOAD]: (state, action) => ({
    ...state,
    downloadable: true,
  }),
  [DERIVATIVE_DISABLE_DOWNLOAD]: (state, action) => ({
    ...state,
    downloadable: false,
  }),
  [DERIVATIVE_DOWNLOAD_ALL]: (state, action) => {
    const zip = new JSZip();
    const folderName = `${state.images[0].metadata.originalName}-derivatives`;
    const folder = zip.folder(folderName);

    state.images.forEach((image) => {
      folder.file(image.name, image);
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${folderName}.zip`);
    });

    return state;
  },
  [DERIVATIVE_ADD_ERRORS]: (state, action) => {
    return { ...state, errors: state.errors.concat(action.payload) };
  },
  [DERIVATIVE_CLEAR_ERRORS]: (state, action) => {
    return { ...state, errors: [] };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  images: [],
  acting: false,
  downloadable: false,
  errors: [],
};

export default function derivativeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
