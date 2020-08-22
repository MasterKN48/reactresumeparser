import React, { useContext } from "react";
import { store } from "../store";
import {
  Container,
  Box,
  CircularProgress,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Button,
} from "@material-ui/core";
import { Parser } from "json2csv";

const ShowResume = () => {
  const globalState = useContext(store);
  const { state } = globalState;
  const download = () => {
    const json2csvParser = new Parser({ delimiter: "\t" });
    let data = state.parsed;
    let fileName = data.fileName.split(".")[0] + ".csv";

    const csv = json2csvParser.parse(data);
    saveFile(csv, fileName);
    function saveFile(data, fileName) {
      let file = new Blob([data], { type: "text/csv;charset=utf-8;" });
      if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, fileName);
      else {
        // Others
        var a = document.createElement("a"),
          url = URL.createObjectURL(file);
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    }
  };
  return (
    <Box my="2rem">
      <Container align="center">
        {state.loading === true ? <CircularProgress color="primary" /> : null}
        {state.parsed && (
          <Fade in={true} timeout={900}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    <Typography gutterBottom variant="subtitle2">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography gutterBottom variant="subtitle2">
                      {state.parsed.name ?? "Not Found"}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography gutterBottom variant="subtitle2">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography gutterBottom variant="subtitle2">
                      {state.parsed.email ?? "Not Found"}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography gutterBottom variant="subtitle2">
                      Phone
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography gutterBottom variant="subtitle2">
                      {state.parsed.phone ?? "Not Found"}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography gutterBottom variant="subtitle2">
                      Social Media
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography gutterBottom variant="subtitle2">
                      {state.parsed.socialMedia ?? "Not Found"}
                    </Typography>
                  </TableCell>
                </TableRow>
                {state.parsed.skills ? (
                  <TableRow>
                    <TableCell align="right">
                      <Typography gutterBottom variant="subtitle2">
                        Skills
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography gutterBottom variant="subtitle2">
                        {state.parsed.skills}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : null}
                {state.parsed.languages ? (
                  <TableRow>
                    <TableCell align="right">
                      <Typography gutterBottom variant="subtitle2">
                        Languages
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography gutterBottom variant="subtitle2">
                        {state.parsed.languages}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : null}
                <TableRow>
                  <TableCell align="right">
                    <Typography gutterBottom variant="subtitle2">
                      Font Family (approx.)
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography gutterBottom variant="subtitle2">
                      {state.parsed.fonts[0] ?? "Not Found"}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography gutterBottom variant="subtitle2">
                      Font Size (approx.)
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography gutterBottom variant="subtitle2">
                      {state.parsed.fontSizes[0] ?? "Not Found"}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography gutterBottom variant="subtitle2">
                      Total Pages
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography gutterBottom variant="subtitle2">
                      {state.parsed.totalPages ?? "Not Found"}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography gutterBottom variant="subtitle2">
                      Total Lines (count of `\n`)
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography gutterBottom variant="subtitle2">
                      {state.parsed.totalLines ?? "Not Found"}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography gutterBottom variant="subtitle2">
                      Total Characters
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography gutterBottom variant="subtitle2">
                      {state.parsed.totalChars ?? "Not Found"}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Fade>
        )}
        {state.parsed ? (
          <Button onClick={download} variant="outlined" color="secondary">
            Save as csv
          </Button>
        ) : null}
      </Container>
    </Box>
  );
};

export default ShowResume;
