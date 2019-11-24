import React from "react";
import {
  Page,
  Text, 
  View,
  Document,
  StyleSheet,
  Font
} from "@react-pdf/renderer";
import CourierPrime from '../../../Services/Font/Courier Prime/CourierPrime.ttf' 


Font.register({family: 'courier-prime', src: CourierPrime})
 
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        fontFamily: 'courier-prime',
        fontSize: 16,
        margin: '96px', 
        marginLeft: '144px'
    },
    titleSection: {
        marginTop: 336,
        // marginRight: '96px',
        marginBottom: 96,
        // marginLeft: '144px'
        lineHeight: 2
    }, 
    section: {
        paddingBottom:'96px'
    },
    scriptTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        width: 336,
        textAlign: 'center',
        marginLeft: 96
    },
    scriptAuthor: {
        width: 336,
        textAlign: 'center',
        marginLeft: 96
    },
    scriptSubtitle: {
        width: 336,
        textAlign: 'center',
        marginLeft: 96
    },
    top: {
        width: '100px',
        height: '96px'
    },
    bottom: {
        width: '100px',
        height: '96px'
    },
    title: {
        fontSize: 20
    },
    header: {
        width: '576px'
    },
    action: {
        width: '576px'
    },
    actor: {
        marginTop: '8px',
        marginLeft: '192px'
    },
    line: {
        marginLeft: '96px',
        width: '336px',
        marginBottom: '8px',
        textAlign: 'justify',
    },
    parenthetical: {
        marginLeft: '144px',
        width: '236px',
        textAlign: 'left'
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 16,
        top: 48,
        right: 192
    }
})
 
export const ScriptDoc = ({titlePg, scriptTxt}) => { 
    return (
        <Document>
            <Page style={styles.page} size="A3" wrap>
                <View style={styles.titleSection}>
                    <Text style={styles.scriptTitle}>
                        {titlePg.title}
                    </Text>
                    <Text style={styles.scriptAuthor}>
                        written by
                    </Text>
                    <Text style={styles.scriptAuthor}>
                        {titlePg.author}
                    </Text>
                    <Text style={styles.scriptSubtitle}>
                        {titlePg.subtitle}
                    </Text>
                </View>
                <View break style={styles.section}>
                <Text style={styles.top} fixed></Text>
                <Text style={styles.pageNumber} render={({ pageNumber }) => (
        `${pageNumber}`
      )} fixed />
            {scriptTxt.length > 0 ? scriptTxt.map((para, i) => {
                if (para.tag === 'Header') {
                    return (<Text key={i} style={styles.header}>{para.lines[0].toUpperCase()}</Text>)   
                } 
                if (para.tag === 'Action') { 
                    {para.lines.map((line, i) => {
                        return <Text key={i} style={styles.action}>{line}</Text> 
                    })}   
                }
                if (para.actor !== null) {   
                    return (
                    <>
                    <Text style={styles.actor}>{para.actor.toUpperCase()}</Text>
                        {para.lines.map((line, i) => {
                            if (line.includes('(') && line.includes(')')) {
                            return (<Text key={i} style={styles.parenthetical}>{line}</Text>)
                            }
                            return (<Text key={i} style={styles.line}>{line}</Text>)
                        })} 
                        </>
                    )                        
                }
            }): ""}
                <Text style={styles.bottom} fixed></Text> 
            </View>
            </Page> 
        </Document>
    )
}
