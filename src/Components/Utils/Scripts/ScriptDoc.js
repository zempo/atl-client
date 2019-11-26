import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font
} from "@react-pdf/renderer";
import CourierPrime from "../../../Services/Font/Courier Prime/CourierPrime.ttf";

Font.register({ family: "courier-prime", src: CourierPrime });

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    fontFamily: "courier-prime",
    fontSize: 16,
    margin: "96px",
    marginLeft: "144px"
  },
  titleSection: {
    marginTop: 200,
    // marginRight: '96px',
    marginBottom: 96,
    // marginLeft: '144px'
    lineHeight: 2
  },
  section: {
    paddingBottom: "96px"
  },
  scriptTitle: {
    fontSize: 20,
    fontWeight: "bold",
    width: 336,
    textAlign: "center",
    marginLeft: 96
  },
  scriptAuthor: {
    width: 336,
    textAlign: "center",
    marginLeft: 96
  },
  scriptSubtitle: {
    marginTop: 200,
    width: 336,
    textAlign: "center",
    marginLeft: 96
  },
  top: {
    width: "100px",
    height: "96px"
  },
  bottom: {
    width: "100px",
    height: "96px"
  },
  header: {
    width: "576px",
    marginBottom: "16px",
    marginTop: "8px"
  },
  action: {
    width: "576px",
    marginBottom: "16px",
    marginTop: "8px"
  },
  actor: {
    marginTop: "8px",
    marginLeft: "192px"
  },
  line: {
    marginLeft: "96px",
    width: "336px",
    marginBottom: "8px",
    textAlign: "justify"
  },
  parenthetical: {
    marginLeft: "144px",
    width: "236px",
    textAlign: "left"
  },
  scriptTag: {
    marginLeft: 476,
    marginTop: "8px",
    width: 200
  },
  pageNumber: {
    position: "absolute",
    fontSize: 16,
    top: 48,
    right: 192
  }
});

export const ScriptDoc = ({ titlePg, scriptTxt }) => {
  return (
    <Document>
      <Page style={styles.page} size="A3" wrap>
        <View style={styles.titleSection}>
          <Text style={styles.scriptTitle}>{titlePg.title}</Text>
          <Text style={styles.scriptAuthor}>written by</Text>
          <Text style={styles.scriptAuthor}>{titlePg.author}</Text>
          <Text style={styles.scriptSubtitle}>{titlePg.subtitle}</Text>
        </View>
        <View break style={styles.section}>
          <Text style={styles.top} fixed></Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber}`}
            fixed
          />
          {scriptTxt.length > 0
            ? scriptTxt.map((para, i) => {
                if (para.tag !== null) {
                  if (para.tag === "Header" || para.tag === "Shot") {
                    return (
                      <Text key={i} style={styles.header}>
                        {para.lines[0].toUpperCase()}
                      </Text>
                    );
                  } else if (para.tag === "Action") {
                    return (
                      <Text key={i} style={styles.action}>
                        {para.lines[0]}
                      </Text>
                    );
                  } else if (para.tag === "Transition") {
                    return (
                      <Text key={i} style={styles.scriptTag}>
                        {para.lines[0].toUpperCase()}
                      </Text>
                    );
                  } else {
                    return (
                      <Text style={styles.scriptTag} key={i}>
                        {para.tag.toUpperCase()}
                      </Text>
                    );
                  }
                }
                if (para.actor !== null) {
                  return (
                    <View key={i}>
                      <Text style={styles.actor}>
                        {para.actor.toUpperCase()}
                      </Text>
                      {para.lines.map((line, i) => {
                        if (line.includes("(") && line.includes(")")) {
                          return (
                            <Text key={i} style={styles.parenthetical}>
                              {line}
                            </Text>
                          );
                        }
                        return (
                          <Text key={i} style={styles.line}>
                            {line}
                          </Text>
                        );
                      })}
                    </View>
                  );
                }
              })
            : ""}
          <Text style={styles.bottom} fixed></Text>
        </View>
      </Page>
    </Document>
  );
};
