package com.jk1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class CustomController {

    @RequestMapping("/")
    public void index(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendRedirect("/static/index.html");
    }
}
