package it.akademija;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import it.akademija.user.UserService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private SecurityEntryPoint securityEntryPoint;
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private UserService userService;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
//auth.inMemoryAuthentication().withUser("uu")
// .password("pp").roles("USER", "CALC");
	}

//	@Bean
//	public AuthenticationSuccessHandler gentooAuthenticationSuccessHandler() {
//		return new GentooSimpleUrlAuthenticationSuccessHandler();
//	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				// be saugumo UI dalis ir swaggeris
				.antMatchers("/", "/api/**", "/swagger-ui.html", "console").permitAll()
				// visi /api/ saugus (dar galima .anyRequest() )
				.antMatchers("/admin").hasRole("ADMIN").antMatchers("/user").authenticated().and().formLogin() // leidziam

				// login
				// prisijungus
//				.successHandler(gentooAuthenticationSuccessHandler())
				.successHandler(new AuthenticationSuccessHandler() {
					@Override
					public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
							Authentication authentication) throws IOException, ServletException {
						response.setHeader("Access-Control-Allow-Credentials", "true");
						response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
						response.setHeader("Content-Type", "application/json;charset=UTF-8");
						response.getWriter()
								.print("{\"username\": \""
										+ SecurityContextHolder.getContext().getAuthentication().getName()
										+ "\", \"role\":\""
										+ userService.findByUsername(
												SecurityContextHolder.getContext().getAuthentication().getName())
												.getRole()
										+ "\"}");
//						response.getWriter().print("{\"role\": \""
//								+ userService.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).getRole() + "\"}");
					}
				})
				// esant blogiems user/pass
				.failureHandler(new SimpleUrlAuthenticationFailureHandler()).loginPage("/login").permitAll() // jis jau
																												// egzistuoja
																												// !
				.and().logout().permitAll() // leidziam /logout
				.and().csrf().disable() // nenaudojam tokenu
				// toliau forbidden klaidai
				.exceptionHandling().authenticationEntryPoint(securityEntryPoint).and().headers().frameOptions()
				.disable(); // H2 konsolei

	}

}