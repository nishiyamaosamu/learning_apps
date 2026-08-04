// このファイルは scripts/sync-index.mjs が生成する。直接編集しない。
// 動画を追加・削除したら `node scripts/sync-index.mjs` を実行して再生成すること。
//
// 登録対象は src/videos/<app>/<id>.tsx の `export const <名前>: VideoSpec`。
// - 本番動画: <app> はアプリ名ディレクトリ、id はアプリ接頭辞つきでファイル名と同じ
//   （例: ipa_ip/ip-L1v9-…, ipa_sg/sg-L1-…）
// - 手本・確認用デモ: src/videos/demo/ 配下
// レンダリング: npx remotion render <id> draft/<app>/<出力名>.mp4（draft/ は git 対象外）
import type { VideoSpec } from "./types";
import { bepFixedVariableCost } from "./demo/bep-fixed-variable-cost";
import { demo } from "./demo/demo";
import { narrationDemo } from "./demo/narration-demo";
import { wipeDemo } from "./demo/wipe-demo";
import { L1v9CorporateActivity } from "./ipa_ip/ip-L1v9-corporate-activity";
import { L2ManagementBasics } from "./ipa_ip/ip-L2-management-basics";
import { SgL1WhatIsInfosec } from "./ipa_sg/sg-L1-what-is-infosec";
import { SgL2AssetThreatVuln } from "./ipa_sg/sg-L2-asset-threat-vuln";
import { SgL3HumanDeception } from "./ipa_sg/sg-L3-human-deception";
import { SgL4MalwareTypes } from "./ipa_sg/sg-L4-malware-types";
import { SgL5RansomwareBotnet } from "./ipa_sg/sg-L5-ransomware-botnet";
import { SgL6FraudTriangle } from "./ipa_sg/sg-L6-fraud-triangle";
import { SgL7PasswordAttacks } from "./ipa_sg/sg-L7-password-attacks";
import { SgL8InjectionAttacks } from "./ipa_sg/sg-L8-injection-attacks";
import { SgL9ClientSideAttacks } from "./ipa_sg/sg-L9-client-side-attacks";
import { SgL10SpoofingPhishing } from "./ipa_sg/sg-L10-spoofing-phishing";
import { SgL11MitmTampering } from "./ipa_sg/sg-L11-mitm-tampering";
import { SgL12DosTargeted } from "./ipa_sg/sg-L12-dos-targeted";
import { SgL13KillChainRaas } from "./ipa_sg/sg-L13-kill-chain-raas";
import { SgL14AiThreats } from "./ipa_sg/sg-L14-ai-threats";
import { SgL15Encryption } from "./ipa_sg/sg-L15-encryption";
import { SgL16HashKeyManagement } from "./ipa_sg/sg-L16-hash-key-management";
import { SgL17DigitalSignature } from "./ipa_sg/sg-L17-digital-signature";
import { SgL18PasswordAuthentication } from "./ipa_sg/sg-L18-password-authentication";
import { SgL19MfaPasswordless } from "./ipa_sg/sg-L19-mfa-passwordless";
import { SgL20Biometrics } from "./ipa_sg/sg-L20-biometrics";
import { SgL21PkiCertificate } from "./ipa_sg/sg-L21-pki-certificate";
import { SgL22SecurityManagement } from "./ipa_sg/sg-L22-security-management";
import { SgL23AssetClassification } from "./ipa_sg/sg-L23-asset-classification";
import { SgL24RiskAssessment } from "./ipa_sg/sg-L24-risk-assessment";
import { SgL25RiskTreatment } from "./ipa_sg/sg-L25-risk-treatment";
import { SgL26SecurityContinuity } from "./ipa_sg/sg-L26-security-continuity";
import { SgL27SecurityPolicies } from "./ipa_sg/sg-L27-security-policies";
import { SgL28IsmsManagementSystem } from "./ipa_sg/sg-L28-isms-management-system";
import { SgL29IsmsControlsCertification } from "./ipa_sg/sg-L29-isms-controls-certification";
import { SgL30IncidentHandling } from "./ipa_sg/sg-L30-incident-handling";
import { SgL31SecurityOrganizations } from "./ipa_sg/sg-L31-security-organizations";
import { SgL32StandardsGuidelines } from "./ipa_sg/sg-L32-standards-guidelines";
import { SgL33SecurityEvaluation } from "./ipa_sg/sg-L33-security-evaluation";
import { SgL34PeopleSecurity } from "./ipa_sg/sg-L34-people-security";
import { SgL35MalwareRansomwareDefense } from "./ipa_sg/sg-L35-malware-ransomware-defense";
import { SgL36AccessControlZeroTrust } from "./ipa_sg/sg-L36-access-control-zero-trust";
import { SgL37LogVulnerabilityManagement } from "./ipa_sg/sg-L37-log-vulnerability-management";
import { SgL38NetworkDefense } from "./ipa_sg/sg-L38-network-defense";
import { SgL39SecurityProductsMap } from "./ipa_sg/sg-L39-security-products-map";
import { SgL41PhysicalSecurity } from "./ipa_sg/sg-L41-physical-security";
import { SgL42SecureProtocols } from "./ipa_sg/sg-L42-secure-protocols";
import { SgL43EmailDomainAuth } from "./ipa_sg/sg-L43-email-domain-auth";
import { SgL44EmailEncryptionSpam } from "./ipa_sg/sg-L44-email-encryption-spam";
import { SgL45NetworkSecurityImplementation } from "./ipa_sg/sg-L45-network-security-implementation";
import { SgL46ApplicationSecurity } from "./ipa_sg/sg-L46-application-security";
import { SgL47IpRightsTradeSecrets } from "./ipa_sg/sg-L47-ip-rights-trade-secrets";
import { SgL48CybersecurityBasicAct } from "./ipa_sg/sg-L48-cybersecurity-basic-act";
import { SgL49PersonalInfoProtection } from "./ipa_sg/sg-L49-personal-info-protection";
import { SgL50AnonymizedInfo } from "./ipa_sg/sg-L50-anonymized-info";
import { SgL51CriminalLawCybercrime } from "./ipa_sg/sg-L51-criminal-law-cybercrime";
import { SgL52OtherSecurityLaws } from "./ipa_sg/sg-L52-other-security-laws";
import { SgL53LaborContractLaws } from "./ipa_sg/sg-L53-labor-contract-laws";
import { SgL54InfoEthicsStandards } from "./ipa_sg/sg-L54-info-ethics-standards";
import { SgL78SubjectBMethod } from "./ipa_sg/sg-L78-subject-b-method";
import { SgL79AssetRegister } from "./ipa_sg/sg-L79-asset-register";
import { SgL80RiskValue } from "./ipa_sg/sg-L80-risk-value";

export const videos: VideoSpec[] = [
  bepFixedVariableCost,
  demo,
  narrationDemo,
  wipeDemo,
  L1v9CorporateActivity,
  L2ManagementBasics,
  SgL1WhatIsInfosec,
  SgL2AssetThreatVuln,
  SgL3HumanDeception,
  SgL4MalwareTypes,
  SgL5RansomwareBotnet,
  SgL6FraudTriangle,
  SgL7PasswordAttacks,
  SgL8InjectionAttacks,
  SgL9ClientSideAttacks,
  SgL10SpoofingPhishing,
  SgL11MitmTampering,
  SgL12DosTargeted,
  SgL13KillChainRaas,
  SgL14AiThreats,
  SgL15Encryption,
  SgL16HashKeyManagement,
  SgL17DigitalSignature,
  SgL18PasswordAuthentication,
  SgL19MfaPasswordless,
  SgL20Biometrics,
  SgL21PkiCertificate,
  SgL22SecurityManagement,
  SgL23AssetClassification,
  SgL24RiskAssessment,
  SgL25RiskTreatment,
  SgL26SecurityContinuity,
  SgL27SecurityPolicies,
  SgL28IsmsManagementSystem,
  SgL29IsmsControlsCertification,
  SgL30IncidentHandling,
  SgL31SecurityOrganizations,
  SgL32StandardsGuidelines,
  SgL33SecurityEvaluation,
  SgL34PeopleSecurity,
  SgL35MalwareRansomwareDefense,
  SgL36AccessControlZeroTrust,
  SgL37LogVulnerabilityManagement,
  SgL38NetworkDefense,
  SgL39SecurityProductsMap,
  SgL41PhysicalSecurity,
  SgL42SecureProtocols,
  SgL43EmailDomainAuth,
  SgL44EmailEncryptionSpam,
  SgL45NetworkSecurityImplementation,
  SgL46ApplicationSecurity,
  SgL47IpRightsTradeSecrets,
  SgL48CybersecurityBasicAct,
  SgL49PersonalInfoProtection,
  SgL50AnonymizedInfo,
  SgL51CriminalLawCybercrime,
  SgL52OtherSecurityLaws,
  SgL53LaborContractLaws,
  SgL54InfoEthicsStandards,
  SgL78SubjectBMethod,
  SgL79AssetRegister,
  SgL80RiskValue,
];
