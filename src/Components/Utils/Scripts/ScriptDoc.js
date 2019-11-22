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
                return (<View key={i}>
                    {para.lines.map((line, i) => {
                        return <Text key={i}>{line}</Text>
                    })}
                </View>)
            }): ""}
            </Page> 
        </Document>
    )
}
