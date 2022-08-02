import React from 'react'
import { SignatureData } from '../../lib/types'
import { icons } from '../../styles/icons'
import { theme } from '../../styles/theme'
import { ThemeProvider } from '@mui/material'

interface EmailSignatureProps {
  signatureData?: SignatureData
}

// This component now uses inline styles so that it can be sent over Mailgun.
// See styles definition below
export default function EmailSignature ({ signatureData }: EmailSignatureProps) {
  return <>
    {signatureData &&
      (
        <ThemeProvider theme={theme}>
          <table cellPadding={0} cellSpacing={0}
            style={styles.table}>
            <tbody>
              <tr>
                <td valign="top" style={styles.logoContainer}>
                  <img
                    id="preview-image-url"
                    src={icons.HBP_LOGO.image}
                    alt={icons.HBP_LOGO.altText}
                    style={styles.logoImage}
                  />
                </td>
                <td style={styles.contentContainer}>
                  <table cellPadding={0} cellSpacing={0}>
                    <tbody>
                      <tr>
                        <td colSpan={2} style={styles.signatureName}>
                          {signatureData.fullName}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} style={styles.signatureText}>
                          {signatureData.title}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} style={styles.signatureText}>
                          <strong>HackBeanpot, Inc.</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.phoneNumber}>
                          {/* TODO: Style phone numbers as XXX-XXX-XXXX */}
                          {signatureData.phone}
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" style={styles.linkContainer}>
                          <a
                            href='https://hackbeanpot.com'
                            target='_blank'
                            rel='noreferrer'
                            style={styles.link}
                          >
                            www.hackbeanpot.com
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.signatureText}>
                          <a
                            href={`mailto:${signatureData.email}@hackbeanpot.com`}
                            style={styles.link}
                          >
                            {signatureData.email}@hackbeanpot.com
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </ThemeProvider>
      )}
  </>
}

// Styles used for the signature.
const styles = {
  table: {
    background: 'none',
    borderWidth: 0,
    border: 0,
    margin: 0,
    padding: 0,
    [theme.breakpoints.up('xs')]: {
      marginLeft: -25
    }
  },
  logoContainer: {
    paddingRight: 24,
    border: 0
  },
  contentContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 12,
    paddingRight: 0,
    lineHeight: '21px'
  },
  signatureName: {
    color: theme.palette.HBPNavy.main,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: theme.typography.fontFamily
  },
  logoImage: {
    height: 132
  },
  signatureText: {
    color: theme.palette.HBPNavy.main,
    fontSize: 14,
    fontFamily: theme.typography.fontFamily
  },
  phoneNumber: {
    color: theme.palette.HBPNavy.main,
    textDecoration: 'none',
    fontSize: 14,
    fontFamily: theme.typography.fontFamily
  },
  linkContainer: {
    verticalAlign: 'top',
    color: theme.palette.HBPNavy.main,
    fontSize: 14,
    fontFamily: theme.typography.fontFamily
  },
  link: {
    color: theme.palette.Mist.main,
    textDecoration: 'none',
    fontWeight: 'normal',
    fontSize: 14
  }
}
