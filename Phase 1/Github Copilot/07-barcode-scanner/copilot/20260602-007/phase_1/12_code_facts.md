# Code Facts

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/barcode-scanner/copilot/20260602-007/phase_1/12_code_facts.md |
| Status | COMPLETE |
| Created by | GitHub Copilot (Claude Haiku 4.5) |
| Last updated | 2026-06-02T23:15:00Z |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | Android | ScannerBaseActivity.java | onCreate(Bundle savedInstanceState) | Activity created; permissions check; camera provider setup | [android: ScannerBaseActivity.java:protected void onCreate] |
| EP-002 | Android | ScannerBaseActivity.java | requestCameraPermission() | Camera permission required; checked after ProcessCameraProvider available | [android: ScannerBaseActivity.java:private void requestCameraPermission] |
| EP-003 | Android | ScannerBaseActivity.java | bindAllCameraUseCases() | After permission granted; camera initialization | [android: ScannerBaseActivity.java:private void bindAllCameraUseCases] |
| EP-004 | Android | BarcodeScannerProcessor.java | BarcodeScannerProcessor(Context, ExchangeScannedData, BarcodeScannerOptions) | Processor initialized with barcode options | [android: BarcodeScannerProcessor.java:public BarcodeScannerProcessor] |
| EP-005 | Android | BarcodeScannerProcessor.java | onSuccess(List<Barcode>, GraphicOverlay) | Barcode detection callback fires | [android: BarcodeScannerProcessor.java:protected void onSuccess] |
| EP-006 | Android | ScannerBaseActivity.java | onRestart() | Activity restarted; image processor restarted | [android: ScannerBaseActivity.java:protected void onRestart] |
| EP-007 | iOS | BarcodeCaptureActivity.swift | onCreate(Bundle) | Activity created; camera source setup (legacy, ~50% commented) | [ios: BarcodeCaptureActivity.swift (archived):public void onCreate] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | Android | Check camera permission status | Context | Permission granted or AlertDialog shown | [android: ScannerBaseActivity.java:ContextCompat.checkSelfPermission(this, android.Manifest.permission.CAMERA)] |
| BEH-002 | Android | Initialize camera provider via ViewModelProvider | Application context | ProcessCameraProvider available | [android: ScannerBaseActivity.java:new ViewModelProvider(this).get(CameraXViewModel.class).getProcessCameraProvider()] |
| BEH-003 | Android | Configure barcode scanner options | BarcodeScannerOptions | Scanner configured for EAN-8, EAN-13, Code128 (configurable) | [android: BarcodeScannerProcessor.java:BarcodeScannerOptions.Builder().setBarcodeFormats(...)] |
| BEH-004 | Android | Bind camera use cases (Preview + ImageAnalysis) | ProcessCameraProvider | Camera preview displayed; image frames flowing to processor | [android: ScannerBaseActivity.java:private void bindAllCameraUseCases] |
| BEH-005 | Android | Process barcode frames via ML Kit | InputImage from camera frames | Barcode detection results | [android: BarcodeScannerProcessor.java:protected Task<List<Barcode>> detectInImage(InputImage image)] |
| BEH-006 | Android | Extract barcode raw value and display | List<Barcode> results | For each barcode: graphicOverlay.add() + exchangeScannedData.sendScannedCode(barcode.getRawValue()) | [android: BarcodeScannerProcessor.java:protected void onSuccess(...)] |
| BEH-007 | Android | Handle barcode detection failure | Exception during detection | Log error; onFailure() called | [android: BarcodeScannerProcessor.java:protected void onFailure(Exception e)] |
| BEH-008 | Android | Post barcode result to main thread handler | barcode string (background thread) | Handler.post() executes main thread task | [android: ScannerBaseActivity.java (implicit in processor callback)] |
| BEH-009 | Android | Stop image processor on pause/destroy | ImageAnalysis active | imageProcessor.stop() called; resources released | [android: ScannerBaseActivity.java:protected void onPause() / onDestroy()] |
| BEH-010 | Android | Show permission denied dialog | Camera permission not granted | AlertDialog shown; app finishes | [android: ScannerBaseActivity.java:AlertDialog.Builder(...).setTitle(R.string.important_information)] |
| BEH-011 | Android | Restart image processor on activity resume | Activity restarted | restartImageProcessor() called in onRestart | [android: ScannerBaseActivity.java:protected void onRestart] |
| BEH-012 | iOS | Initialize barcode detector with format filtering | BarcodeDetector.Builder | BarcodeDetector configured for supported formats | [ios: BarcodeCaptureActivity.swift (archived):BarcodeDetector.Builder(...).setBarcodeFormats(...)] |
| BEH-013 | iOS | Capture barcode via camera callback | GMS Vision detection (legacy) | Barcode raw value extracted | [ios: BarcodeCaptureActivity.swift (archived):onBarcodeCaptured] |
| BEH-014 | iOS | Return barcode result to caller | sendCapturedBarcode(barcode) | setResult(RESULT_OK, Intent) + finish() | [ios: BarcodeCaptureActivity.swift (archived):private void sendCapturedBarcode] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | Android | App launch → Settings | User taps barcode scanner button | ScannerBaseActivity + subclass created; onCreate called | [android: ScannerBaseActivity.java:protected void onCreate] |
| STATE-002 | Android | Permission check | checkSelfPermission() | If granted: bindAllCameraUseCases; if denied: AlertDialog shown | [android: ScannerBaseActivity.java:requestCameraPermission] |
| STATE-003 | Android | Camera provider loading | ProcessCameraProvider.getInstance().addListener() | Provider received; bindAllCameraUseCases called | [android: CameraXViewModel.java:addListener(...)] |
| STATE-004 | Android | Initializing camera | bindAllCameraUseCases() executing | Preview + ImageAnalysis bound to camera | [android: ScannerBaseActivity.java:private void bindAllCameraUseCases] |
| STATE-005 | Android | Camera active | Frame stream from camera | BarcodeScannerProcessor.detectInImage() processes frames | [android: BarcodeScannerProcessor.java:detectInImage] |
| STATE-006 | Android | Barcode detected | onSuccess(barcodes) fires | For each barcode: sendScannedCode(barcode.getRawValue()) posted to handler | [android: BarcodeScannerProcessor.java:onSuccess] |
| STATE-007 | Android | Result posted to main thread | handler.post(mainThreadTask) | exchangeScannedData callback fires; caller receives barcode | [android: ScannerBaseActivity.java (implicit)] |
| STATE-008 | Android | Activity paused | onPause() fires | imageProcessor.stop() called; camera released | [android: ScannerBaseActivity.java:protected void onPause] |
| STATE-009 | Android | Activity destroyed | onDestroy() fires | imageProcessor.stop() called; all resources released | [android: ScannerBaseActivity.java:protected void onDestroy] |
| STATE-010 | Android | Activity restarted | onRestart() fires | restartImageProcessor() called; camera restarted | [android: ScannerBaseActivity.java:protected void onRestart] |
| STATE-011 | iOS | App launch → Settings | User taps barcode button | BarcodeCaptureActivity.onCreate() called (legacy) | [ios: BarcodeCaptureActivity.swift (archived):onCreate] |
| STATE-012 | iOS | Camera setup | createCameraSource() executing | BarcodeDetector created; camera ready | [ios: BarcodeCaptureActivity.swift (archived):createCameraSource] |
| STATE-013 | iOS | Barcode captured | GMS Vision callback fires | sendCapturedBarcode(barcode) → setResult + finish | [ios: BarcodeCaptureActivity.swift (archived):sendCapturedBarcode] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | Android | cameraProvider (field) | Write | ProcessCameraProvider | [android: ScannerBaseActivity.java:private ProcessCameraProvider cameraProvider] |
| STOR-002 | Android | previewUseCase (field) | Write | Preview | [android: ScannerBaseActivity.java:private Preview previewUseCase] |
| STOR-003 | Android | analysisUseCase (field) | Write | ImageAnalysis | [android: ScannerBaseActivity.java:private ImageAnalysis analysisUseCase] |
| STOR-004 | Android | imageProcessor (field) | Write | VisionImageProcessor (BarcodeScannerProcessor) | [android: ScannerBaseActivity.java:private VisionImageProcessor imageProcessor] |
| STOR-005 | Android | camera (field) | Write | Camera | [android: ScannerBaseActivity.java:private Camera camera] |
| STOR-006 | Android | lensFacing (field) | Write | int (CameraSelector.LENS_FACING_BACK) | [android: ScannerBaseActivity.java:private int lensFacing = CameraSelector.LENS_FACING_BACK] |
| STOR-007 | iOS | responseUrl (field, archived) | Write | String (barcode result URL, legacy) | [ios: BarcodeCaptureActivity.swift (archived):private String responseUrl] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|---|
| API-001 | Android | ProcessCameraProvider.getInstance() | CameraX | Application context | LiveData<ProcessCameraProvider> | [android: CameraXViewModel.java:ProcessCameraProvider.getInstance] |
| API-002 | Android | BarcodeScannerOptions.Builder.setBarcodeFormats() | ML Kit Vision config | Barcode format flags (EAN-8, EAN-13, Code128, etc.) | BarcodeScannerOptions | [android: BarcodeScannerProcessor.java:setBarcodeFormats] |
| API-003 | Android | BarcodeScanning.getClient(options) | ML Kit Vision client | BarcodeScannerOptions | BarcodeScanner | [android: BarcodeScannerProcessor.java:BarcodeScanning.getClient] |
| API-004 | Android | barcodeScanner.process(InputImage) | ML Kit barcode detection | Camera InputImage frame | Task<List<Barcode>> | [android: BarcodeScannerProcessor.java:detectInImage(...)] |
| API-005 | Android | barcode.getRawValue() | ML Kit Barcode object | detected barcode | String (barcode data) | [android: BarcodeScannerProcessor.java:barcode.getRawValue()] |
| API-006 | iOS | GMS Vision BarcodeDetector (legacy) | Barcode detection (deprecated) | Camera frame | Barcode object (legacy) | [ios: BarcodeCaptureActivity.swift (archived):BarcodeDetector] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | Android | SettingsActivity (implied) | ScannerBaseActivity + subclass | User taps barcode scanner button | [android: ScannerBaseActivity.java (via Intent/startActivityForResult)] |
| NAV-002 | Android | ScannerBaseActivity | Caller (Settings/etc) | Barcode scanned; setResult(RESULT_OK) + finish() | [android: ScannerBaseActivity.java (subclass handles result)] |
| NAV-003 | Android | ScannerBaseActivity | Caller | Cancel button or back; setResult(RESULT_CANCELED) | [android: ScannerBaseActivity.java (subclass handles cancel)] |
| NAV-004 | iOS | SettingsActivity (implied) | BarcodeCaptureActivity | User taps barcode scanner button (legacy) | [ios: BarcodeCaptureActivity.swift (archived):onCreate] |
| NAV-005 | iOS | BarcodeCaptureActivity | Caller | Barcode scanned; sendCapturedBarcode() + finish() (legacy) | [ios: BarcodeCaptureActivity.swift (archived):finish] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | Android | Camera permission denied | AlertDialog shown; app finishes | User sees permission error; app closes | [android: ScannerBaseActivity.java:AlertDialog.Builder(...).setTitle(R.string.important_information)] |
| ERRPATH-002 | Android | ProcessCameraProvider unavailable | Exception in CameraXViewModel listener | App may not start camera; log error | [android: CameraXViewModel.java:catch (ExecutionException \| InterruptedException)] |
| ERRPATH-003 | Android | ML Kit not operational | isOperational() check (Android 5.0+) | Barcode detection unavailable; graceful degradation | [android: BarcodeScannerProcessor.java (implicit ML Kit check)] |
| ERRPATH-004 | Android | barcode.getRawValue() is null or empty | Skip processing; continue frame loop | No result passed to caller; waiting | [android: BarcodeScannerProcessor.java:if (barcode != null && barcode.getRawValue() != null && !barcode.getRawValue().isEmpty())] |
| ERRPATH-005 | Android | Exception during barcode detection | onFailure(exception) called; error logged | Detection paused; frame loop continues | [android: BarcodeScannerProcessor.java:onFailure] |
| ERRPATH-006 | iOS | Barcode detection failure (legacy) | Error callback; show alert (legacy) | User notified; can retry (legacy behavior) | [ios: BarcodeCaptureActivity.swift (archived):catch block] |
| ERRPATH-007 | Android | Activity paused unexpectedly | onPause() / onDestroy() cleanup | imageProcessor.stop() called; resources released safely | [android: ScannerBaseActivity.java:onPause/onDestroy] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | Android | androidx.camera.core (CameraX) | Camera preview + frame processing | react-native-vision-camera | [android: ScannerBaseActivity.java:import androidx.camera.core.*] |
| DEP-002 | Android | com.google.mlkit.vision.barcode (ML Kit) | Barcode detection | react-native-qrcode-scanner, expo-barcode-scanner, or custom ML Kit wrapper | [android: BarcodeScannerProcessor.java:import com.google.mlkit.vision.barcode.*] |
| DEP-003 | Android | androidx.lifecycle (ViewModel, LiveData) | Camera provider management; reactive updates | Custom state management or react-native hooks | [android: ScannerBaseActivity.java:import androidx.lifecycle.*] |
| DEP-004 | Android | android.os.Handler (main thread) | Post barcode results to main thread | React Native threading model or async/await | [android: ScannerBaseActivity.java:protected final Handler handler] |
| DEP-005 | iOS | GMS Vision (legacy, archived) | Barcode detection (deprecated) | Modern ML Kit or React Native barcode scanner | [ios: BarcodeCaptureActivity.swift (archived):import com.google.mobile.vision] |
| DEP-006 | iOS | AVFoundation (legacy, archived) | Camera access (legacy) | react-native-camera or expo-camera | [ios: BarcodeCaptureActivity.swift (archived):import AVFoundation] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | Android | Camera preview (PreviewView) | Display camera feed with live barcode detection overlay | [android: ScannerBaseActivity.java:previewView = findViewById(R.id.preview_view)] |
| UI-002 | Android | GraphicOverlay | Draw barcode bounding boxes + detection indicators | [android: ScannerBaseActivity.java:graphicOverlay = findViewById(R.id.graphic_overlay)] |
| UI-003 | Android | Explanation/Title TextView | Display "Scan barcode" or similar instruction text | [android: ScannerBaseActivity.java:explanation = findViewById(R.id.explanation)] |
| UI-004 | Android | Result Container (LinearLayout) | Container for post-scan results or status | [android: ScannerBaseActivity.java:resultContainer = findViewById(R.id.resultContainer)] |
| UI-005 | Android | Permission AlertDialog | Show camera permission denied message | [android: ScannerBaseActivity.java:AlertDialog.Builder(...).setTitle(R.string.important_information)] |
| UI-006 | iOS | Camera preview (legacy) | Display camera feed with barcode overlay (archived) | [ios: BarcodeCaptureActivity.swift (archived):CameraSourcePreview] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | Android | Camera access permission | User grants permission via AlertDialog + manifest | RN: Request camera permission; handle denial gracefully | [android: ScannerBaseActivity.java:Manifest.permission.CAMERA] |
| SEC-002 | iOS | Camera access permission | User grants permission via system prompt | RN: Request camera permission; handle denial gracefully | [ios: BarcodeCaptureActivity.swift (archived):AVCaptureDevice authorization] |
| SEC-003 | Android/iOS | Barcode content (product code, ISBN, etc.) | Raw barcode string passed to caller | RN: Validate barcode format; sanitize data before processing | [android/ios: barcode.getRawValue() / sendCapturedBarcode] |
| SEC-004 | Android | ML Kit data processing | Local on-device detection; no network transmission | RN: Ensure barcode scanner processes on-device only | [android: BarcodeScannerProcessor.java (ML Kit on-device)] |

---
