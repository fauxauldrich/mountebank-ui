// @ts-ignore
import * as JSONEditor from "@json-editor/json-editor";
import { Imposter } from "./models/Imposter";
import { ImposterSchema } from "./models/schema/schema";
import MountebankService from "./services/mountebank";
const $ = require("jquery");
const dt = require("datatables.net");
JSONEditor.__proto__.constructor();
$(document).ready(() => {
  const mountebankService = new MountebankService($);
  if (location.pathname === "/") {
    const elem = document.getElementById("editor");
    let options = {
      schema: ImposterSchema,
      theme: "spectre",
      display_required_only: true,
      array_controls_top: true,
      iconlib: "spectre",
      form_name_root: "imposter",
      remove_button_labels: true,
    };
    if (localStorage.getItem("edit-imposter")) {
      // @ts-ignore
      options["startval"] = <Imposter>JSON.parse(<string>localStorage.getItem("edit-imposter"));
      localStorage.clear();
      $("#createImposter").text("Update Imposter");
    }
    const editor = new (<any>window).JSONEditor(elem, options);
    $("#createImposter").click((e: any) => {
      e.preventDefault();
      const errors = editor.validate();
      if (errors.length) {
        console.log(errors);
      } else {
        if ($("#createImposter").text() === "Update Imposter") {
          mountebankService.deleteImposter(editor.getValue().port);
          localStorage.clear();
        }
        mountebankService
          .createImposter(editor.getValue())
          .then((imposter) => {
            alert(`Service Successfully Created At ${imposter.port}`);
            location.reload();
          })
          .catch((err) => {
            alert("Something went wrong. Check console and network for more details");
            console.log(err);
          });
      }
    });
  }
  if (location.pathname.indexOf("imposters") != -1) {
    mountebankService.getImposters().then((data) => {
      let imposters = data.imposters;
      $("#imposters").html("");
      var result = imposters.map((imposter: Imposter) => {
        var result = [];
        let name = "-----";
        typeof imposter.name === "undefined" ? (name = "-----") : (name = imposter.name);
        result.push(imposter.port);
        result.push(imposter.protocol);
        result.push(name);
        result.push(imposter.numberOfRequests);
        result.push(`<button class="btn btn-primary btn-sm edit" id="edit_${imposter.port}"><i class="icon icon-edit"></i></button>`);
        result.push(`<button class="btn btn-error btn-sm delete" id="delete_${imposter.port}"><i class="icon icon-delete"></i></button>`);
        return result;
      });
      $("#imposters").DataTable({
        aaData: result,
        aoColumns: [
          { sTitle: "Port" },
          { sTitle: "Protocol" },
          { sTitle: "Name" },
          { sTitle: "Request Count" },
          { sTitle: "Actions - Edit" },
          { sTitle: "Actions - Delete" },
        ],
        deferRender: true,
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        sDom: "lfrtip",
        fnCreatedRow: function (nRow: any, aData: any, iDataIndex: any) {
          $(nRow).attr("id", aData[0]);
        },
      });
      $("table").on("click", ".delete", (e: any) => {
        e.preventDefault();
        if (confirm("Are you sure?")) {
          const port = <number>e.currentTarget.id.replace("delete_", "");
          mountebankService
            .deleteImposter(port)
            .then(() => {
              location.reload();
            })
            .catch((err) => {
              alert("Something went wrong. Check console and network for more details");
              console.log(err);
            });
        }
      });
      $("table").on("click", ".edit", (e: any) => {
        e.preventDefault();
        const port = <number>e.currentTarget.id.replace("edit_", "");
        mountebankService
          .getSingleImposter(port)
          .then((data: any) => {
            console.log(data);
            let imposter = JSON.stringify(data);
            localStorage.setItem("edit-imposter", imposter);
            location.href = "/";
          })
          .catch((err) => {
            alert("Something went wrong. Check console and network for more details");
            console.log(err);
          });
      });
    });
  }
  if (location.pathname.indexOf("logs") != -1) {
    mountebankService.getLogs().then((data: any) => {
      let logs = data.logs;
      $("#logs").html("");
      var result = logs.map((log: any) => {
        var result = [];
        result.push(log.timestamp);
        result.push(log.level);
        result.push(log.message);
        return result;
      });
      $("#logs").DataTable({
        aaData: result,
        aoColumns: [{ sTitle: "Timestamp" }, { sTitle: "Level" }, { sTitle: "Message" }],
        deferRender: true,
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        sDom: "lfrtip",
        fnCreatedRow: function (nRow: any, aData: any, iDataIndex: any) {
          $(nRow).attr("id", aData[0]);
        },
      });
    });
  }
});
