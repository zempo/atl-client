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
        fontSize: 16
    },
    titleSection: {
        marginTop: '96px',
        marginRight: '96px',
        marginBottom: '96px',
        marginLeft: '144px'
    },
    section: {
        marginRight: '96px',
        // marginBottom: '96px',
        marginLeft: '144px'
    },
    line: {
        width: '336px'
    },
    top: {
        width: '100px',
        height: '96px'
    },
    bottom: {
        width: '100px',
        height: '96px'
    }
})
 
export const ScriptDoc = ({titlePg, scriptTxt}) => { 
    return (
        <Document>
            <Page style={styles.page} size="letter" wrap>
                <View style={styles.titleSection}>
                    <Text>
                        {titlePg.title}
                    </Text>
                    <Text>
                        {titlePg.author}
                    </Text>
                    <Text>
                        {titlePg.subtitle}
                    </Text>
                </View>
                <View break style={styles.section}>
                    <Text style={styles.top} fixed></Text>
            {scriptTxt.length > 0 ? scriptTxt.map((para, i) => {
                if (para.tag === 'Header') {
                    return (<Text key={i}>{para.lines[0]}</Text>)   
                } 
                if (para.tag === 'Action') { 
                    {para.lines.map((line, i) => {
                        return <Text key={i} style={styles.line}>{line}</Text>
                    })}   
                }
                if (para.actor !== null) {   
                    return (<><Text>{para.actor}</Text>
                        {para.lines.map((line, i) => {
                            return <Text key={i} wrap style={styles.line}>{line}</Text>
                        })}</>
                        )                        
                }
            }): ""}
                <Text style={styles.bottom} fixed></Text> 
            </View>
            </Page> 
        </Document>
    )
}
