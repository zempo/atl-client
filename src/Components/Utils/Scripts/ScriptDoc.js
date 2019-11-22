import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff'
    }
})

export const ScriptDoc = ({titlePg, scriptTxt}) => {
    return (
        <Document>
            <Page wrap="false">
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
            <Page>
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
                        return <Text key={i}>{line}</Text>
                    })}
                </View>)
                }
            }): ""}
            </Page> 
        </Document>
    )
}
