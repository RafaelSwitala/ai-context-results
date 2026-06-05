# MobileBrowserV2Tests (storage-config Phase 2)

XCTest-Quellen für `storage-config` liegen hier. Das Xcode-Projekt `MobileBrowserV2.xcodeproj` hat noch **kein** Unit-Test-Target (ERR-P2-01).

## Integration auf macOS

1. Xcode öffnen: `MobileBrowserV2/MobileBrowserV2.xcodeproj`
2. **File → New → Target → Unit Testing Bundle** (`MobileBrowserV2Tests`)
3. Beide Swift-Dateien diesem Target zuordnen
4. **Host Application**: `MobileBrowserV2`
5. Tests ausführen:

```bash
xcodebuild test \
  -project MobileBrowserV2/MobileBrowserV2.xcodeproj \
  -scheme MobileBrowserV2 \
  -destination 'platform=iOS Simulator,name=iPhone 16'
```
