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
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import it.akademija.SecurityEntryPoint;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

//	@Autowired
//	private SecurityEntryPoint securityEntryPoint;
//	@Autowired
//	private UserDetailsService userService;
//
//	@Autowired
//	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(userService);
//
//	}
//
//	@Bean
//	public PasswordEncoder getPasswordEncoder() {
//		return NoOpPasswordEncoder.getInstance();
//	}
//
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http.authorizeRequests()
//				// be saugumo UI dalis ir swaggeris
//				.antMatchers("/", "/swagger-ui.html", "/login*").permitAll()
//				// visi /test/ keliai yra saugus, pasiekiami tik prisijungus
//				.antMatchers("/user/**", "/admin/**", "/").authenticated().and().formLogin().permitAll()
//
//				// prisijungus
//				.successHandler(new AuthenticationSuccessHandler() {
//					@Override
//					public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//							Authentication authentication) throws IOException, ServletException {
//						response.setHeader("Access-Control-Allow-Credentials", "true");
//						response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
//						response.setHeader("Content-Type", "application/json;charset=UTF-8");
//						response.getWriter().print("{\"username\": \""
//								+ SecurityContextHolder.getContext().getAuthentication().getName() + "\"}");
//					}
//				})
//				// esant blogiems user/pass
//				.failureHandler(new SimpleUrlAuthenticationFailureHandler()).loginPage("/").permitAll().and().logout()
//				.permitAll()
//				// G pridetas testavimui. veikia. tik nzn, ka reikia paduoti i response. idejau
//				// ta pati ka i login
//				.logoutSuccessHandler(new LogoutSuccessHandler() {
//					@Override
//					public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response,
//							Authentication authentication) throws IOException, ServletException {
//						response.setHeader("Access-Control-Allow-Credentials", "true");
//						response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
//						response.setHeader("Content-Type", "application/json;charset=UTF-8");
//					}
//				}).and().csrf().disable() // nenaudojam tokenu
//				// forbidden klaidai
//				.exceptionHandling().authenticationEntryPoint(securityEntryPoint).and().headers().frameOptions()
//				.disable(); // H2 konsolei
//
//	}

	@Autowired
	private SecurityEntryPoint securityEntryPoint;
	@Autowired
	private UserDetailsService userService;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService);
//		auth.inMemoryAuthentication().withUser("uu").password("pp").roles("USER", "CALC");
	}

	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				// be saugumo UI dalis ir swaggeris
				.antMatchers("/**", "/swagger-ui.html", "/console", "/api/**", "/admin/**").permitAll()
				// .antMatchers("/user/**").authenticated()
				// .and()
				// visi /api/ saugus (dar galima .anyRequest() )
				.antMatchers("/user/**", "/admin/**").authenticated().and().formLogin().loginPage("/login").permitAll() // leidziam
				// login
				// prisijungus

				// .antMatchers("/test/**").authenticated().and().formLogin().loginPage("/login").permitAll(

				.successHandler(new AuthenticationSuccessHandler() {
					@Override
					public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
							Authentication authentication) throws IOException, ServletException {
						response.setHeader("Access-Control-Allow-Credentials", "true");
						response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
						response.setHeader("Content-Type", "application/json;charset=UTF-8");
						response.getWriter().print("{\"username\": \""
								+ SecurityContextHolder.getContext().getAuthentication().getName() + "\"}");
					}

				}).defaultSuccessUrl("/admin", true)
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