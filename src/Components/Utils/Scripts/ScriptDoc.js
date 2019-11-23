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
        margin: '96px',
        marginLeft: '144px'
    },
    line: {
        width: '336px'
    }
})
 
export const ScriptDoc = ({titlePg, scriptTxt}) => { 
    return (
        <Document>
            <Page wrap="false" style={styles.page} size="letter">
                <View>
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
            </Page>
            <Page style={styles.page} size="letter" wrap="true">
            {scriptTxt.length > 0 ? scriptTxt.map((para, i) => {
                if (para.tag === 'Header') {
                 return (<View key={i}>
                <Text>{para.lines[0]}</Text>
                 </View>)   
                } 
                if (para.actor !== null) {   
                    return (<View key={i}>
                    <Text>{para.actor}</Text>                        
                    {para.lines.map((line, i) => {
                        return <Text key={i} style={styles.line}>{line}</Text>
                    })}
                </View>)
                }
            }): ""}
            </Page> 
        </Document>
    )
}
