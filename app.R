library(httr)
library(dplyr)
library(tidyr)
library(stringr)
library(purrr)
library(shiny)
library(jsonlite)
library(shinythemes)

get_data_from_url <- function(url) {
  resp <- httr::GET(
    url = url,
    content_type_json(), 
    add_headers(authorization="Bearer 40iJgsMIRmnb5fX4WP4s8AVVWe6m"))
  content(resp)
}

all_cases <- 
  "https://api.srgssr.ch/polis-api/v2/cases?lang=en&listAllCases=true" %>%
  get_data_from_url() %>%
  pluck("Case")

extract_votation_key_from_case <- function(c, key_name) {
  c$Votations$Votation %>% map(key_name) %>% unlist(recursive = F)
}

extract_votation_key_from_case2 <- function(c, key1, key2) {
  c$Votations$Votation %>% 
    map(function(v) { pluck(v, key1, key2) }) %>% 
    unlist(recursive = F)
}

votations_data <- map(all_cases,
                      function(c) {
                        list(
                          votation_titles = extract_votation_key_from_case(c, "Title"), 
                          votation_ids = extract_votation_key_from_case(c, "id"), 
                          votation_location = extract_votation_key_from_case2(c, "VotationLocation", "LocationName"),
                          case_id = c$id,
                          case_date = c$EventDate
                        )
                      })

votations_meta <- tibble(
  case_id = map_chr(votations_data, "case_id"),
  case_date = map_chr(votations_data, "case_date"),
  votations_title = map(votations_data, "votation_titles"),
  votations_id = map(votations_data, "votation_ids"),
  votations_location = map(votations_data, "votation_location")
) %>%
  filter((!map_lgl(votations_title, is.null)),
         (!map_lgl(votations_title, is.null)), 
         (!map_lgl(votations_title, is.null))) %>% 
  unnest() %>%
  filter(votations_location == "Switzerland")

get_votation_result_by_id <- function(id) {
  str_glue("https://api.srgssr.ch/polis-api/v2/votations/{id}?lang=fr") %>%
    get_data_from_url() %>%
    pluck("Items") %>%
    .[[2]] %>%
    pluck("Results") %>%
    .[[1]] %>%
    pluck("Result") %>%
    keep(function(r){r$Location$LocationType$id == "2"}) %>%
    map(function(i){
      list(canton=i$Location$ShortName,
           yes=as.numeric(i$Absolute$Yes),
           no=as.numeric(i$Absolute$No))
    })
}



ui <- navbarPage(
  theme = shinytheme("flatly"),
  "POLIS SSR Vote Results Extractor",
  tabPanel("Canton",
      sidebarPanel(
         selectInput("selectedVote", "Select a Vote",
                     votations_meta$votations_title)
      ),
      mainPanel(
        tabsetPanel(type = "tabs",
                    tabPanel("Table",
                      h2("Results in table format"),
                      dataTableOutput("dt")),
                    tabPanel("JSON",
                      h2("Results in JSON format"),
                      verbatimTextOutput("json"))
        )
      )
  )
)

server <- function(input, output) {
  output$json <- 
      renderPrint({
        result_list <- list(
          vote=input$selectedVote,
          results=get_votation_result_by_id(
            filter(votations_meta, votations_title == input$selectedVote)$votations_id
          )
        )
        jsonlite::toJSON(result_list, pretty=T, auto_unbox = T)
      })
  output$dt <- renderDataTable({
      results <- get_votation_result_by_id(
        filter(votations_meta, votations_title == input$selectedVote)$votations_id
      )
      tibble(canton=map_chr(results, "canton"),
             yes=map_chr(results, "yes"),
             no=map_chr(results, "no"))
  })
}

shinyApp(ui = ui, server = server)

