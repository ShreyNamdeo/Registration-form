package com.input.form.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping(value = "")
    public String index(Model model) throws Exception{
        model.addAttribute("title", "SR LEGAL");
        return "index";
    }
}
