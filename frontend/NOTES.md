# NOTES

### RUNNING IN ARCH LINUX

error running "npx tauri dev"

```
/*
** (bpi-questionaire:212434): WARNING **: 11:02:57.939: webkit_settings_set_enable_offline_web_application_cache is deprecated and does nothing.
No issues found.
src/nv_gbm.c:300: GBM-DRV error (nv_gbm_create_device_native): nv_common_gbm_create_device failed (ret=-1)

KMS: DRM_IOCTL_MODE_CREATE_DUMB failed: Permission denied
KMS: DRM_IOCTL_MODE_CREATE_DUMB failed: Permission denied
Failed to create GBM buffer of size 1600x900: Permission denied
*/
```

solved by adding "WEBKIT_DISABLE_DMABUF_RENDERER=1" in prepend command

```
WEBKIT_DISABLE_DMABUF_RENDERER=1 npx tauri dev
```
